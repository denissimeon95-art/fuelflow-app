/**
 * Generates icon-192.png and icon-512.png in /public
 * Run: node scripts/generate-icons.mjs
 * No extra dependencies required — uses only Node.js built-ins.
 */
import { deflateSync } from 'zlib'
import { writeFileSync } from 'fs'

// ── CRC-32 ─────────────────────────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) c = c & 1 ? (c >>> 1) ^ 0xEDB88320 : c >>> 1
    t[i] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xFFFFFFFF
  for (const b of buf) c = (c >>> 8) ^ CRC_TABLE[(c ^ b) & 0xFF]
  return ((c ^ 0xFFFFFFFF) >>> 0)
}

function chunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.alloc(4)
  lenBuf.writeUInt32BE(data.length)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])))
  return Buffer.concat([lenBuf, typeBytes, data, crcBuf])
}

// ── PNG generator ──────────────────────────────────────────────────
function makePNG(size) {
  const BG  = [0x0F, 0x0F, 0x11]   // #0F0F11
  const ACC = [0xA8, 0xE0, 0x63]   // #A8E063
  const DRK = [0x08, 0x08, 0x0A]   // slightly darker for inner shadow

  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.38        // drop shape radius
  const innerR = size * 0.24        // inner highlight

  const lines = []
  for (let y = 0; y < size; y++) {
    const row = [0] // PNG filter byte
    for (let x = 0; x < size; x++) {
      // Rounded rect background (simulate rx=22%)
      const rrR = size * 0.22
      const inRR =
        (x >= rrR && x <= size - rrR) ||
        (y >= rrR && y <= size - rrR) ||
        Math.hypot(x - rrR, y - rrR) <= rrR ||
        Math.hypot(x - (size - rrR), y - rrR) <= rrR ||
        Math.hypot(x - rrR, y - (size - rrR)) <= rrR ||
        Math.hypot(x - (size - rrR), y - (size - rrR)) <= rrR

      if (!inRR) { row.push(...BG); continue }

      // Fuel drop: teardrop shape centered, pointing up
      // Top point at cy - outerR*1.4, bottom round at cy + outerR*0.7
      const topY  = cy - outerR * 1.5
      const botCY = cy + outerR * 0.5

      // Circle bottom half
      const distBot = Math.hypot(x - cx, y - botCY)
      // Triangle upper half (simple approach: use parabola)
      const normedY = (y - topY) / (botCY - topY)
      const halfW   = normedY * outerR

      let inDrop = false
      if (y >= topY && y <= botCY + outerR) {
        if (y >= botCY) {
          inDrop = distBot <= outerR
        } else {
          inDrop = Math.abs(x - cx) <= halfW
        }
      }

      if (!inDrop) { row.push(...BG); continue }

      // Inner highlight
      const distIn = Math.hypot(x - cx, y - (botCY - innerR * 0.3))
      if (distIn <= innerR) {
        // blend dark
        const t = 1 - distIn / innerR
        row.push(
          Math.round(ACC[0] * (1 - t * 0.6)),
          Math.round(ACC[1] * (1 - t * 0.6)),
          Math.round(ACC[2] * (1 - t * 0.6))
        )
      } else {
        row.push(...ACC)
      }
    }
    lines.push(Buffer.from(row))
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // RGB

  const raw = deflateSync(Buffer.concat(lines), { level: 9 })
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', raw), chunk('IEND', Buffer.alloc(0))])
}

writeFileSync('public/icon-192.png', makePNG(192))
writeFileSync('public/icon-512.png', makePNG(512))
console.log('✓ public/icon-192.png (192×192)')
console.log('✓ public/icon-512.png (512×512)')
