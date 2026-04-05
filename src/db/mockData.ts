import type { MealPlan, WorkoutPlan, WorkoutLog } from '../types'

// Returns ISO date string N days ago
function dago(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

// Build 4 sets with given weight and target reps
function sets4(reps: number, weight: number) {
  return [1,2,3,4].map(setNumber => ({ setNumber, reps, weight, unit: 'kg' as const }))
}

// ── 8 workout logs per session, spanning ~6 weeks ────────────────
// Push A dates (every ~5-6 days): 41,35,30,25,20,15,9,4 days ago
// Pull A: 40,34,29,24,19,14,8,3
// Legs A: 38,33,28,22,17,12,7,2
// Full Body: 36,31,26,20,15,10,5,1

export function createMockWorkoutLogs(planId: number): Omit<WorkoutLog, 'id'>[] {
  return [
    // ── Push A ── (8 sessions)
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(41),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(8, 70)   },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(10, 40)  },
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 20)  },
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 10)  },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(35),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(8, 72.5) },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(10, 42.5)},
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 22.5)},
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 10)  },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(30),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(9, 72.5) },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(10, 42.5)},
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 22.5)},
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 12.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(25),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(8, 75)   },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(10, 45)  },
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 25)  },
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 12.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(20),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(8, 75)   },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(10, 45)  },
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 25)  },
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 12.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(15),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(8, 77.5) },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(9, 47.5) },
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 27.5)},
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 15)  },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(9),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(8, 80)   },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(9, 47.5) },
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 27.5)},
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 15)  },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'push-a', sessionName: 'Push A', date: dago(4),
      exerciseLogs: [
        { exerciseId: 'push-a-1', exerciseName: 'Panca Piana',     sets: sets4(8, 82.5) },
        { exerciseId: 'push-a-2', exerciseName: 'Shoulder Press',  sets: sets4(9, 50)   },
        { exerciseId: 'push-a-3', exerciseName: 'Tricep Pushdown', sets: sets4(12, 30)  },
        { exerciseId: 'push-a-4', exerciseName: 'Lateral Raise',   sets: sets4(15, 15)  },
      ],
    },

    // ── Pull A ── (8 sessions)
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(40),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(7, 0)   },
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(8, 60)  },
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 30) },
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 15) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(34),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(8, 0)   },
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(8, 62.5)},
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 32.5)},
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 17.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(29),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(8, 0)   },
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(9, 62.5)},
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 32.5)},
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 17.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(24),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(9, 0)   },
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(8, 65)  },
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 35) },
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 20) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(19),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(9, 5)   },
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(8, 65)  },
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 35) },
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 20) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(14),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(8, 10)  },
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(8, 67.5)},
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 37.5)},
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 22.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(8),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(8, 10)  },
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(9, 67.5)},
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 37.5)},
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 22.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'pull-a', sessionName: 'Pull A', date: dago(3),
      exerciseLogs: [
        { exerciseId: 'pull-a-1', exerciseName: 'Trazioni',            sets: sets4(8, 12.5)},
        { exerciseId: 'pull-a-2', exerciseName: 'Rematore Bilanciere', sets: sets4(8, 70)  },
        { exerciseId: 'pull-a-3', exerciseName: 'Curl Bilanciere',     sets: sets4(10, 40) },
        { exerciseId: 'pull-a-4', exerciseName: 'Face Pull',           sets: sets4(15, 25) },
      ],
    },

    // ── Legs A ── (8 sessions)
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(38),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(8, 80)  },
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 140)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 60) },
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 35) },
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 40) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(33),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(8, 82.5)},
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 145)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 62.5)},
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 37.5)},
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 42.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(28),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(8, 85)  },
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 150)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 65) },
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 37.5)},
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 45) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(22),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(8, 85)  },
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 150)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 65) },
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 40) },
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 45) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(17),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(8, 87.5)},
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 155)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 67.5)},
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 40) },
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 47.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(12),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(8, 90)  },
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 160)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 70) },
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 42.5)},
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 50) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(7),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(9, 90)  },
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 160)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 70) },
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 42.5)},
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 50) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'legs-a', sessionName: 'Legs A', date: dago(2),
      exerciseLogs: [
        { exerciseId: 'legs-a-1', exerciseName: 'Squat',             sets: sets4(8, 92.5)},
        { exerciseId: 'legs-a-2', exerciseName: 'Leg Press',         sets: sets4(10, 165)},
        { exerciseId: 'legs-a-3', exerciseName: 'Romanian Deadlift', sets: sets4(10, 72.5)},
        { exerciseId: 'legs-a-4', exerciseName: 'Leg Curl',          sets: sets4(12, 45) },
        { exerciseId: 'legs-a-5', exerciseName: 'Calf Raise',        sets: sets4(15, 52.5)},
      ],
    },

    // ── Full Body ── (8 sessions)
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(36),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 100) },
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 50)  },
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(8, 0)   },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(8, 0)   },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(31),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 105) },
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 52.5)},
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(9, 0)   },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(8, 5)   },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(26),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 107.5)},
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 52.5) },
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(10, 5)   },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(8, 5)    },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(20),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 110) },
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 55)  },
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(10, 5)  },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(8, 10)  },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(15),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 112.5)},
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 55)   },
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(10, 10)  },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(8, 10)   },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(10),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 115) },
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 57.5)},
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(10, 10) },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(8, 12.5)},
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(5),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 117.5)},
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 57.5) },
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(10, 15)  },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(9, 12.5) },
      ],
    },
    {
      workoutPlanId: planId, sessionId: 'full-body', sessionName: 'Full Body', date: dago(1),
      exerciseLogs: [
        { exerciseId: 'fb-1', exerciseName: 'Stacco da Terra',  sets: sets4(6, 120) },
        { exerciseId: 'fb-2', exerciseName: 'Military Press',   sets: sets4(8, 60)  },
        { exerciseId: 'fb-3', exerciseName: 'Dip',              sets: sets4(10, 15) },
        { exerciseId: 'fb-4', exerciseName: 'Chin Up',          sets: sets4(8, 15)  },
      ],
    },
  ]
}

export const mockWorkoutPlan: Omit<WorkoutPlan, 'id'> = {
  name: 'Push Pull Legs — Massa',
  createdAt: new Date().toISOString(),
  sessions: [
    {
      id: 'push-a',
      name: 'Push A',
      exercises: [
        {
          id: 'push-a-1',
          name: 'Panca Piana',
          muscleGroups: ['Pettorali', 'Deltoidi anteriori', 'Tricipiti'],
          sets: 4, reps: '8-10',
          notes: 'Presa larga, torace alto, scapole retratte',
        },
        {
          id: 'push-a-2',
          name: 'Shoulder Press',
          muscleGroups: ['Deltoidi', 'Tricipiti', 'Trapezio'],
          sets: 4, reps: '8-10',
          notes: 'Manubri o bilanciere, non bloccare i gomiti in cima',
        },
        {
          id: 'push-a-3',
          name: 'Tricep Pushdown',
          muscleGroups: ['Tricipiti'],
          sets: 4, reps: '10-12',
          notes: 'Cavo alto, gomiti fissi ai fianchi',
        },
        {
          id: 'push-a-4',
          name: 'Lateral Raise',
          muscleGroups: ['Deltoidi laterali'],
          sets: 4, reps: '12-15',
          notes: 'Alzate laterali con manubri, gomiti leggermente flessi',
        },
      ],
    },
    {
      id: 'pull-a',
      name: 'Pull A',
      exercises: [
        {
          id: 'pull-a-1',
          name: 'Trazioni',
          muscleGroups: ['Dorsali', 'Bicipiti', 'Romboidi'],
          sets: 4, reps: '6-10',
          notes: 'Presa prona larga, mento sopra la sbarra',
        },
        {
          id: 'pull-a-2',
          name: 'Rematore Bilanciere',
          muscleGroups: ['Dorsali', 'Romboidi', 'Trapezio', 'Bicipiti'],
          sets: 4, reps: '8-10',
          notes: 'Busto a 45°, tirare verso l\'ombelico',
        },
        {
          id: 'pull-a-3',
          name: 'Curl Bilanciere',
          muscleGroups: ['Bicipiti', 'Brachiale'],
          sets: 4, reps: '10-12',
          notes: 'Gomiti fissi, niente oscillazione del busto',
        },
        {
          id: 'pull-a-4',
          name: 'Face Pull',
          muscleGroups: ['Deltoidi posteriori', 'Romboidi', 'Trapezio'],
          sets: 4, reps: '15-20',
          notes: 'Cavo all\'altezza del viso, pull verso la fronte',
        },
      ],
    },
    {
      id: 'legs-a',
      name: 'Legs A',
      exercises: [
        {
          id: 'legs-a-1',
          name: 'Squat',
          muscleGroups: ['Quadricipiti', 'Glutei', 'Femorali', 'Core'],
          sets: 4, reps: '8-10',
          notes: 'Scendere a profondità parallela, ginocchia sui piedi',
        },
        {
          id: 'legs-a-2',
          name: 'Leg Press',
          muscleGroups: ['Quadricipiti', 'Glutei', 'Femorali'],
          sets: 4, reps: '10-12',
          notes: 'Piedi a larghezza spalle, non bloccare le ginocchia',
        },
        {
          id: 'legs-a-3',
          name: 'Romanian Deadlift',
          muscleGroups: ['Femorali', 'Glutei', 'Lombari'],
          sets: 4, reps: '10-12',
          notes: 'Schiena neutra, scendere fino a sentire lo stretch',
        },
        {
          id: 'legs-a-4',
          name: 'Leg Curl',
          muscleGroups: ['Femorali', 'Bicipite femorale'],
          sets: 4, reps: '12-15',
          notes: 'Contrazione completa, movimento controllato in negativa',
        },
        {
          id: 'legs-a-5',
          name: 'Calf Raise',
          muscleGroups: ['Gastrocnemio', 'Soleo'],
          sets: 4, reps: '15-20',
          notes: 'Range completo, pausa in cima e in basso',
        },
      ],
    },
    {
      id: 'full-body',
      name: 'Full Body',
      exercises: [
        {
          id: 'fb-1',
          name: 'Stacco da Terra',
          muscleGroups: ['Femorali', 'Glutei', 'Dorsali', 'Trapezio', 'Core'],
          sets: 4, reps: '6-8',
          notes: 'Schiena neutra, testa in linea, spingere il pavimento',
        },
        {
          id: 'fb-2',
          name: 'Military Press',
          muscleGroups: ['Deltoidi', 'Tricipiti', 'Core'],
          sets: 4, reps: '8-10',
          notes: 'Bilanciere davanti, core contratto, no iperestensione lombare',
        },
        {
          id: 'fb-3',
          name: 'Dip',
          muscleGroups: ['Pettorali', 'Tricipiti', 'Deltoidi anteriori'],
          sets: 4, reps: '8-12',
          notes: 'Busto leggermente inclinato per i pettorali',
        },
        {
          id: 'fb-4',
          name: 'Chin Up',
          muscleGroups: ['Dorsali', 'Bicipiti', 'Romboidi'],
          sets: 4, reps: '6-10',
          notes: 'Presa supina, tirare i gomiti verso i fianchi',
        },
      ],
    },
  ],
}


export const mockMealPlan: Omit<MealPlan, 'id'> = {
  name: 'Piano Performance — Massa',
  createdAt: new Date().toISOString(),
  cycleStartDate: new Date().toISOString().split('T')[0],
  cycleLength: 5,
  days: [
    // ── DAY 1 — Alto carboidrati ──────────────────────────────────
    {
      dayNumber: 1,
      meals: [
        {
          id: 'd1-colazione',
          name: 'Colazione',
          timeOfDay: 'colazione',
          alternatives: [
            {
              id: 'd1-col-a1',
              foods: [
                { name: 'Yogurt greco 0%',    quantity: 200, unit: 'g',  calories: 118, protein: 20,  carbs: 8,   fat: 0.6 },
                { name: 'Fiocchi d\'avena',   quantity: 60,  unit: 'g',  calories: 224, protein: 7,   carbs: 38,  fat: 4.2 },
                { name: 'Mirtilli freschi',   quantity: 100, unit: 'g',  calories: 57,  protein: 0.7, carbs: 14,  fat: 0.3 },
                { name: 'Miele millefiori',   quantity: 10,  unit: 'g',  calories: 30,  protein: 0,   carbs: 8,   fat: 0   },
              ],
            },
            {
              id: 'd1-col-a2',
              foods: [
                { name: 'Uova intere',        quantity: 3,   unit: 'pz', calories: 216, protein: 18,  carbs: 1.5, fat: 15  },
                { name: 'Albumi',             quantity: 100, unit: 'g',  calories: 52,  protein: 11,  carbs: 0.7, fat: 0.2 },
                { name: 'Pane di segale',     quantity: 70,  unit: 'g',  calories: 168, protein: 5.5, carbs: 31,  fat: 1.5 },
                { name: 'Burro di arachidi',  quantity: 20,  unit: 'g',  calories: 120, protein: 4.5, carbs: 3.5, fat: 10  },
              ],
            },
          ],
        },
        {
          id: 'd1-spuntino-m',
          name: 'Spuntino Mattina',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd1-sm-a1',
              foods: [
                { name: 'Mela Golden',        quantity: 150, unit: 'g',  calories: 78,  protein: 0.4, carbs: 20,  fat: 0.2 },
                { name: 'Mandorle',           quantity: 25,  unit: 'g',  calories: 145, protein: 5,   carbs: 4.5, fat: 12  },
              ],
            },
            {
              id: 'd1-sm-a2',
              foods: [
                { name: 'Banana',             quantity: 130, unit: 'g',  calories: 119, protein: 1.5, carbs: 27,  fat: 0.4 },
                { name: 'Fiocchi di latte',   quantity: 100, unit: 'g',  calories: 103, protein: 11,  carbs: 4,   fat: 5   },
              ],
            },
          ],
        },
        {
          id: 'd1-pranzo',
          name: 'Pranzo',
          timeOfDay: 'pranzo',
          alternatives: [
            {
              id: 'd1-pr-a1',
              foods: [
                { name: 'Riso basmati',       quantity: 90,  unit: 'g',  calories: 323, protein: 6.3, carbs: 71,  fat: 0.7 },
                { name: 'Petto di pollo',     quantity: 180, unit: 'g',  calories: 198, protein: 41,  carbs: 0,   fat: 3.6 },
                { name: 'Zucchine grigliate', quantity: 200, unit: 'g',  calories: 34,  protein: 2.6, carbs: 5,   fat: 0.4 },
                { name: 'Olio EVO',           quantity: 10,  unit: 'g',  calories: 90,  protein: 0,   carbs: 0,   fat: 10  },
              ],
            },
            {
              id: 'd1-pr-a2',
              foods: [
                { name: 'Pasta integrale',    quantity: 85,  unit: 'g',  calories: 304, protein: 12,  carbs: 60,  fat: 2   },
                { name: 'Tonno al naturale',  quantity: 150, unit: 'g',  calories: 158, protein: 35,  carbs: 0,   fat: 1.5 },
                { name: 'Pomodorini',         quantity: 150, unit: 'g',  calories: 27,  protein: 1.3, carbs: 5.5, fat: 0.3 },
                { name: 'Olive nere',         quantity: 20,  unit: 'g',  calories: 38,  protein: 0.3, carbs: 0.5, fat: 3.8 },
              ],
            },
          ],
        },
        {
          id: 'd1-spuntino-p',
          name: 'Spuntino Pomeriggio',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd1-sp-a1',
              foods: [
                { name: 'Ricotta vaccina',    quantity: 150, unit: 'g',  calories: 222, protein: 11,  carbs: 4.5, fat: 18  },
                { name: 'Fragole',            quantity: 150, unit: 'g',  calories: 48,  protein: 1,   carbs: 11,  fat: 0.5 },
              ],
            },
            {
              id: 'd1-sp-a2',
              foods: [
                { name: 'Shake proteico',     quantity: 35,  unit: 'g',  calories: 133, protein: 25,  carbs: 4,   fat: 2   },
                { name: 'Latte p.s.',         quantity: 200, unit: 'ml', calories: 68,  protein: 6.8, carbs: 9.6, fat: 0.2 },
                { name: 'Riso soffiato',      quantity: 20,  unit: 'g',  calories: 74,  protein: 1.4, carbs: 17,  fat: 0.2 },
              ],
            },
          ],
        },
        {
          id: 'd1-cena',
          name: 'Cena',
          timeOfDay: 'cena',
          alternatives: [
            {
              id: 'd1-ce-a1',
              foods: [
                { name: 'Salmone fresco',     quantity: 180, unit: 'g',  calories: 370, protein: 35,  carbs: 0,   fat: 25  },
                { name: 'Patate al forno',    quantity: 200, unit: 'g',  calories: 172, protein: 4,   carbs: 38,  fat: 0.2 },
                { name: 'Insalata mista',     quantity: 100, unit: 'g',  calories: 18,  protein: 1.5, carbs: 2.5, fat: 0.2 },
                { name: 'Olio EVO',           quantity: 10,  unit: 'g',  calories: 90,  protein: 0,   carbs: 0,   fat: 10  },
              ],
            },
            {
              id: 'd1-ce-a2',
              foods: [
                { name: 'Petto di tacchino',  quantity: 200, unit: 'g',  calories: 214, protein: 45,  carbs: 0,   fat: 3   },
                { name: 'Quinoa cotta',       quantity: 180, unit: 'g',  calories: 222, protein: 8,   carbs: 39,  fat: 3.5 },
                { name: 'Broccoli al vapore', quantity: 200, unit: 'g',  calories: 68,  protein: 5.7, carbs: 11,  fat: 0.8 },
                { name: 'Olio EVO',           quantity: 8,   unit: 'g',  calories: 72,  protein: 0,   carbs: 0,   fat: 8   },
              ],
            },
          ],
        },
      ],
    },

    // ── DAY 2 — Moderato ─────────────────────────────────────────
    {
      dayNumber: 2,
      meals: [
        {
          id: 'd2-colazione',
          name: 'Colazione',
          timeOfDay: 'colazione',
          alternatives: [
            {
              id: 'd2-col-a1',
              foods: [
                { name: 'Pancakes proteici',  quantity: 3,   unit: 'pz', calories: 270, protein: 22,  carbs: 30,  fat: 6   },
                { name: 'Sciroppo d\'acero',  quantity: 15,  unit: 'g',  calories: 40,  protein: 0,   carbs: 10,  fat: 0   },
                { name: 'Mirtilli',           quantity: 80,  unit: 'g',  calories: 46,  protein: 0.6, carbs: 11,  fat: 0.2 },
              ],
            },
            {
              id: 'd2-col-a2',
              foods: [
                { name: 'Porridge d\'avena',  quantity: 60,  unit: 'g',  calories: 224, protein: 7,   carbs: 38,  fat: 4.2 },
                { name: 'Proteine whey',      quantity: 30,  unit: 'g',  calories: 114, protein: 22,  carbs: 3,   fat: 1.5 },
                { name: 'Banana',             quantity: 100, unit: 'g',  calories: 89,  protein: 1.1, carbs: 23,  fat: 0.3 },
                { name: 'Noci',               quantity: 15,  unit: 'g',  calories: 98,  protein: 2.3, carbs: 2,   fat: 9.7 },
              ],
            },
          ],
        },
        {
          id: 'd2-spuntino-m',
          name: 'Spuntino Mattina',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd2-sm-a1',
              foods: [
                { name: 'Pera',               quantity: 150, unit: 'g',  calories: 85,  protein: 0.5, carbs: 22,  fat: 0.2 },
                { name: 'Formaggio light',    quantity: 30,  unit: 'g',  calories: 72,  protein: 7,   carbs: 0.5, fat: 4.5 },
              ],
            },
            {
              id: 'd2-sm-a2',
              foods: [
                { name: 'Gallette di riso',   quantity: 30,  unit: 'g',  calories: 114, protein: 2.5, carbs: 25,  fat: 0.7 },
                { name: 'Tonno al naturale',  quantity: 80,  unit: 'g',  calories: 84,  protein: 19,  carbs: 0,   fat: 0.8 },
              ],
            },
          ],
        },
        {
          id: 'd2-pranzo',
          name: 'Pranzo',
          timeOfDay: 'pranzo',
          alternatives: [
            {
              id: 'd2-pr-a1',
              foods: [
                { name: 'Farro perlato',      quantity: 80,  unit: 'g',  calories: 280, protein: 9,   carbs: 58,  fat: 1.2 },
                { name: 'Merluzzo al forno',  quantity: 200, unit: 'g',  calories: 166, protein: 36,  carbs: 0,   fat: 1.6 },
                { name: 'Peperoni arrosto',   quantity: 180, unit: 'g',  calories: 52,  protein: 2,   carbs: 10,  fat: 0.5 },
                { name: 'Olio EVO',           quantity: 10,  unit: 'g',  calories: 90,  protein: 0,   carbs: 0,   fat: 10  },
              ],
            },
            {
              id: 'd2-pr-a2',
              foods: [
                { name: 'Riso venere',        quantity: 80,  unit: 'g',  calories: 280, protein: 7,   carbs: 60,  fat: 1.5 },
                { name: 'Gamberoni',          quantity: 200, unit: 'g',  calories: 176, protein: 36,  carbs: 2,   fat: 2   },
                { name: 'Spinaci saltati',    quantity: 150, unit: 'g',  calories: 35,  protein: 3.6, carbs: 4,   fat: 0.5 },
                { name: 'Olio EVO',           quantity: 8,   unit: 'g',  calories: 72,  protein: 0,   carbs: 0,   fat: 8   },
              ],
            },
          ],
        },
        {
          id: 'd2-spuntino-p',
          name: 'Spuntino Pomeriggio',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd2-sp-a1',
              foods: [
                { name: 'Shake proteico',     quantity: 35,  unit: 'g',  calories: 133, protein: 25,  carbs: 4,   fat: 2   },
                { name: 'Acqua',              quantity: 300, unit: 'ml', calories: 0,   protein: 0,   carbs: 0,   fat: 0   },
                { name: 'Mandorle',           quantity: 20,  unit: 'g',  calories: 116, protein: 4,   carbs: 3.6, fat: 9.6 },
              ],
            },
            {
              id: 'd2-sp-a2',
              foods: [
                { name: 'Yogurt greco',       quantity: 150, unit: 'g',  calories: 89,  protein: 15,  carbs: 6,   fat: 0.5 },
                { name: 'Kiwi',               quantity: 100, unit: 'g',  calories: 61,  protein: 1.1, carbs: 15,  fat: 0.5 },
              ],
            },
          ],
        },
        {
          id: 'd2-cena',
          name: 'Cena',
          timeOfDay: 'cena',
          alternatives: [
            {
              id: 'd2-ce-a1',
              foods: [
                { name: 'Manzo magro',        quantity: 180, unit: 'g',  calories: 302, protein: 41,  carbs: 0,   fat: 15  },
                { name: 'Fagiolini al vapore',quantity: 200, unit: 'g',  calories: 62,  protein: 3.4, carbs: 12,  fat: 0.4 },
                { name: 'Pane integrale',     quantity: 50,  unit: 'g',  calories: 115, protein: 4,   carbs: 22,  fat: 1.3 },
              ],
            },
            {
              id: 'd2-ce-a2',
              foods: [
                { name: 'Pollo intero cotto', quantity: 200, unit: 'g',  calories: 290, protein: 38,  carbs: 0,   fat: 15  },
                { name: 'Patate dolci',       quantity: 200, unit: 'g',  calories: 172, protein: 3.2, carbs: 40,  fat: 0.2 },
                { name: 'Asparagi',           quantity: 150, unit: 'g',  calories: 35,  protein: 3.6, carbs: 5,   fat: 0.3 },
              ],
            },
          ],
        },
      ],
    },

    // ── DAY 3 — Alto proteico ─────────────────────────────────────
    {
      dayNumber: 3,
      meals: [
        {
          id: 'd3-colazione',
          name: 'Colazione',
          timeOfDay: 'colazione',
          alternatives: [
            {
              id: 'd3-col-a1',
              foods: [
                { name: 'Uova strapazzate',   quantity: 4,   unit: 'pz', calories: 288, protein: 24,  carbs: 2,   fat: 20  },
                { name: 'Albumi extra',       quantity: 150, unit: 'g',  calories: 78,  protein: 16.5,carbs: 1,   fat: 0.3 },
                { name: 'Salmone affumicato', quantity: 60,  unit: 'g',  calories: 125, protein: 13,  carbs: 0.5, fat: 7.5 },
                { name: 'Pane di segale',     quantity: 50,  unit: 'g',  calories: 120, protein: 3.9, carbs: 22,  fat: 1.1 },
              ],
            },
            {
              id: 'd3-col-a2',
              foods: [
                { name: 'Fiocchi di latte',   quantity: 250, unit: 'g',  calories: 258, protein: 27.5,carbs: 10,  fat: 12.5},
                { name: 'Ananas fresco',      quantity: 120, unit: 'g',  calories: 62,  protein: 0.7, carbs: 15,  fat: 0.1 },
                { name: 'Granola proteica',   quantity: 30,  unit: 'g',  calories: 132, protein: 6,   carbs: 17,  fat: 4   },
              ],
            },
          ],
        },
        {
          id: 'd3-spuntino-m',
          name: 'Spuntino Mattina',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd3-sm-a1',
              foods: [
                { name: 'Barretta proteica',  quantity: 1,   unit: 'pz', calories: 180, protein: 20,  carbs: 15,  fat: 4   },
              ],
            },
            {
              id: 'd3-sm-a2',
              foods: [
                { name: 'Shake proteico',     quantity: 35,  unit: 'g',  calories: 133, protein: 25,  carbs: 4,   fat: 2   },
                { name: 'Latte p.s.',         quantity: 200, unit: 'ml', calories: 68,  protein: 6.8, carbs: 9.6, fat: 0.2 },
              ],
            },
          ],
        },
        {
          id: 'd3-pranzo',
          name: 'Pranzo',
          timeOfDay: 'pranzo',
          alternatives: [
            {
              id: 'd3-pr-a1',
              foods: [
                { name: 'Petto di pollo',     quantity: 250, unit: 'g',  calories: 275, protein: 57,  carbs: 0,   fat: 5   },
                { name: 'Riso basmati',       quantity: 70,  unit: 'g',  calories: 252, protein: 4.9, carbs: 55,  fat: 0.5 },
                { name: 'Verdure miste',      quantity: 200, unit: 'g',  calories: 52,  protein: 3,   carbs: 9,   fat: 0.5 },
              ],
            },
            {
              id: 'd3-pr-a2',
              foods: [
                { name: 'Tonno fresco',       quantity: 220, unit: 'g',  calories: 286, protein: 48,  carbs: 0,   fat: 9.7 },
                { name: 'Lenticchie cotte',   quantity: 200, unit: 'g',  calories: 230, protein: 18,  carbs: 40,  fat: 0.8 },
                { name: 'Pomodori a fette',   quantity: 150, unit: 'g',  calories: 27,  protein: 1.3, carbs: 5.5, fat: 0.3 },
              ],
            },
          ],
        },
        {
          id: 'd3-spuntino-p',
          name: 'Spuntino Pomeriggio',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd3-sp-a1',
              foods: [
                { name: 'Yogurt greco 0%',    quantity: 200, unit: 'g',  calories: 118, protein: 20,  carbs: 8,   fat: 0.6 },
                { name: 'Fragole',            quantity: 100, unit: 'g',  calories: 32,  protein: 0.7, carbs: 7.5, fat: 0.3 },
              ],
            },
            {
              id: 'd3-sp-a2',
              foods: [
                { name: 'Fiocchi di latte',   quantity: 150, unit: 'g',  calories: 155, protein: 16.5,carbs: 6,   fat: 7.5 },
                { name: 'Noci pecan',         quantity: 20,  unit: 'g',  calories: 138, protein: 1.8, carbs: 2.8, fat: 14  },
              ],
            },
          ],
        },
        {
          id: 'd3-cena',
          name: 'Cena',
          timeOfDay: 'cena',
          alternatives: [
            {
              id: 'd3-ce-a1',
              foods: [
                { name: 'Bistecca di manzo',  quantity: 200, unit: 'g',  calories: 330, protein: 46,  carbs: 0,   fat: 16  },
                { name: 'Insalata di cavolo', quantity: 200, unit: 'g',  calories: 56,  protein: 3.2, carbs: 12,  fat: 0.4 },
                { name: 'Olio EVO',           quantity: 10,  unit: 'g',  calories: 90,  protein: 0,   carbs: 0,   fat: 10  },
              ],
            },
            {
              id: 'd3-ce-a2',
              foods: [
                { name: 'Orata al forno',     quantity: 250, unit: 'g',  calories: 245, protein: 45,  carbs: 0,   fat: 7   },
                { name: 'Carciofi al vapore', quantity: 200, unit: 'g',  calories: 72,  protein: 5,   carbs: 16,  fat: 0.4 },
                { name: 'Olio EVO',           quantity: 8,   unit: 'g',  calories: 72,  protein: 0,   carbs: 0,   fat: 8   },
              ],
            },
          ],
        },
      ],
    },

    // ── DAY 4 — Basso carboidrati ─────────────────────────────────
    {
      dayNumber: 4,
      meals: [
        {
          id: 'd4-colazione',
          name: 'Colazione',
          timeOfDay: 'colazione',
          alternatives: [
            {
              id: 'd4-col-a1',
              foods: [
                { name: 'Uova al tegamino',   quantity: 3,   unit: 'pz', calories: 216, protein: 18,  carbs: 1.5, fat: 15  },
                { name: 'Pancetta magra',     quantity: 50,  unit: 'g',  calories: 125, protein: 8,   carbs: 0.5, fat: 10  },
                { name: 'Avocado',            quantity: 80,  unit: 'g',  calories: 128, protein: 1.6, carbs: 6.8, fat: 11.4},
              ],
            },
            {
              id: 'd4-col-a2',
              foods: [
                { name: 'Frittata 3 uova',    quantity: 1,   unit: 'pz', calories: 245, protein: 21,  carbs: 2,   fat: 17  },
                { name: 'Salmone aff.',       quantity: 80,  unit: 'g',  calories: 167, protein: 17,  carbs: 0.7, fat: 10  },
                { name: 'Pomodoro',           quantity: 100, unit: 'g',  calories: 18,  protein: 0.9, carbs: 3.7, fat: 0.2 },
              ],
            },
          ],
        },
        {
          id: 'd4-spuntino-m',
          name: 'Spuntino Mattina',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd4-sm-a1',
              foods: [
                { name: 'Mandorle',           quantity: 30,  unit: 'g',  calories: 173, protein: 6,   carbs: 5.4, fat: 14.8},
                { name: 'Cioccolato 85%',     quantity: 15,  unit: 'g',  calories: 93,  protein: 1.5, carbs: 6,   fat: 7.5 },
              ],
            },
            {
              id: 'd4-sm-a2',
              foods: [
                { name: 'Ricotta vaccina',    quantity: 100, unit: 'g',  calories: 148, protein: 7,   carbs: 3,   fat: 12  },
                { name: 'Frutti di bosco',    quantity: 80,  unit: 'g',  calories: 38,  protein: 0.8, carbs: 9,   fat: 0.3 },
              ],
            },
          ],
        },
        {
          id: 'd4-pranzo',
          name: 'Pranzo',
          timeOfDay: 'pranzo',
          alternatives: [
            {
              id: 'd4-pr-a1',
              foods: [
                { name: 'Salmone al forno',   quantity: 200, unit: 'g',  calories: 412, protein: 39,  carbs: 0,   fat: 28  },
                { name: 'Cavolfiore',         quantity: 250, unit: 'g',  calories: 60,  protein: 5,   carbs: 12,  fat: 0.5 },
                { name: 'Olio EVO',           quantity: 12,  unit: 'g',  calories: 108, protein: 0,   carbs: 0,   fat: 12  },
              ],
            },
            {
              id: 'd4-pr-a2',
              foods: [
                { name: 'Pollo arrosto',      quantity: 220, unit: 'g',  calories: 319, protein: 42,  carbs: 0,   fat: 16  },
                { name: 'Spinaci all\'aglio', quantity: 200, unit: 'g',  calories: 66,  protein: 7,   carbs: 8,   fat: 1   },
                { name: 'Olio EVO',           quantity: 10,  unit: 'g',  calories: 90,  protein: 0,   carbs: 0,   fat: 10  },
              ],
            },
          ],
        },
        {
          id: 'd4-spuntino-p',
          name: 'Spuntino Pomeriggio',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd4-sp-a1',
              foods: [
                { name: 'Shake proteico',     quantity: 35,  unit: 'g',  calories: 133, protein: 25,  carbs: 4,   fat: 2   },
                { name: 'Acqua',              quantity: 300, unit: 'ml', calories: 0,   protein: 0,   carbs: 0,   fat: 0   },
              ],
            },
            {
              id: 'd4-sp-a2',
              foods: [
                { name: 'Uova sode',          quantity: 2,   unit: 'pz', calories: 144, protein: 12,  carbs: 1,   fat: 10  },
                { name: 'Cetrioli',           quantity: 100, unit: 'g',  calories: 15,  protein: 0.7, carbs: 3.6, fat: 0.1 },
              ],
            },
          ],
        },
        {
          id: 'd4-cena',
          name: 'Cena',
          timeOfDay: 'cena',
          alternatives: [
            {
              id: 'd4-ce-a1',
              foods: [
                { name: 'Petto di tacchino',  quantity: 220, unit: 'g',  calories: 235, protein: 49,  carbs: 0,   fat: 3.3 },
                { name: 'Zucchine',           quantity: 250, unit: 'g',  calories: 43,  protein: 3.3, carbs: 6.3, fat: 0.5 },
                { name: 'Funghi',             quantity: 150, unit: 'g',  calories: 37,  protein: 5,   carbs: 5,   fat: 0.5 },
                { name: 'Olio EVO',           quantity: 10,  unit: 'g',  calories: 90,  protein: 0,   carbs: 0,   fat: 10  },
              ],
            },
            {
              id: 'd4-ce-a2',
              foods: [
                { name: 'Branzino al forno',  quantity: 250, unit: 'g',  calories: 255, protein: 43,  carbs: 0,   fat: 8.8 },
                { name: 'Carciofi grigliati', quantity: 200, unit: 'g',  calories: 72,  protein: 5,   carbs: 16,  fat: 0.4 },
                { name: 'Olio EVO',           quantity: 8,   unit: 'g',  calories: 72,  protein: 0,   carbs: 0,   fat: 8   },
              ],
            },
          ],
        },
      ],
    },

    // ── DAY 5 — Refeed / Alto carboidrati ─────────────────────────
    {
      dayNumber: 5,
      meals: [
        {
          id: 'd5-colazione',
          name: 'Colazione',
          timeOfDay: 'colazione',
          alternatives: [
            {
              id: 'd5-col-a1',
              foods: [
                { name: 'French toast proteico', quantity: 2, unit: 'pz', calories: 320, protein: 24,  carbs: 38,  fat: 7   },
                { name: 'Miele',              quantity: 15,  unit: 'g',  calories: 45,  protein: 0,   carbs: 12,  fat: 0   },
                { name: 'Banana',             quantity: 100, unit: 'g',  calories: 89,  protein: 1.1, carbs: 23,  fat: 0.3 },
              ],
            },
            {
              id: 'd5-col-a2',
              foods: [
                { name: 'Porridge speciale',  quantity: 70,  unit: 'g',  calories: 262, protein: 8,   carbs: 45,  fat: 4.9 },
                { name: 'Proteine whey',      quantity: 30,  unit: 'g',  calories: 114, protein: 22,  carbs: 3,   fat: 1.5 },
                { name: 'Banana',             quantity: 130, unit: 'g',  calories: 119, protein: 1.5, carbs: 27,  fat: 0.4 },
                { name: 'Cacao amaro',        quantity: 5,   unit: 'g',  calories: 14,  protein: 1.3, carbs: 2,   fat: 0.8 },
              ],
            },
          ],
        },
        {
          id: 'd5-spuntino-m',
          name: 'Spuntino Mattina',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd5-sm-a1',
              foods: [
                { name: 'Riso soffiato',      quantity: 30,  unit: 'g',  calories: 111, protein: 2.1, carbs: 25,  fat: 0.3 },
                { name: 'Marmellata',         quantity: 20,  unit: 'g',  calories: 49,  protein: 0.2, carbs: 12,  fat: 0.1 },
                { name: 'Albumi',             quantity: 100, unit: 'g',  calories: 52,  protein: 11,  carbs: 0.7, fat: 0.2 },
              ],
            },
            {
              id: 'd5-sm-a2',
              foods: [
                { name: 'Mela + cannella',    quantity: 180, unit: 'g',  calories: 94,  protein: 0.5, carbs: 24,  fat: 0.2 },
                { name: 'Mandorle',           quantity: 25,  unit: 'g',  calories: 145, protein: 5,   carbs: 4.5, fat: 12  },
              ],
            },
          ],
        },
        {
          id: 'd5-pranzo',
          name: 'Pranzo',
          timeOfDay: 'pranzo',
          alternatives: [
            {
              id: 'd5-pr-a1',
              foods: [
                { name: 'Pasta integrale',    quantity: 100, unit: 'g',  calories: 358, protein: 14,  carbs: 71,  fat: 2.4 },
                { name: 'Petto di pollo',     quantity: 160, unit: 'g',  calories: 176, protein: 36,  carbs: 0,   fat: 3.2 },
                { name: 'Sugo pomodoro',      quantity: 150, unit: 'g',  calories: 53,  protein: 2,   carbs: 11,  fat: 0.5 },
                { name: 'Parmigiano',         quantity: 10,  unit: 'g',  calories: 40,  protein: 3.6, carbs: 0.1, fat: 2.8 },
              ],
            },
            {
              id: 'd5-pr-a2',
              foods: [
                { name: 'Riso integrale',     quantity: 100, unit: 'g',  calories: 362, protein: 7.4, carbs: 76,  fat: 2.7 },
                { name: 'Manzo macinato',     quantity: 150, unit: 'g',  calories: 330, protein: 28,  carbs: 0,   fat: 23  },
                { name: 'Zucchine',           quantity: 150, unit: 'g',  calories: 26,  protein: 2,   carbs: 3.8, fat: 0.3 },
              ],
            },
          ],
        },
        {
          id: 'd5-spuntino-p',
          name: 'Spuntino Pomeriggio',
          timeOfDay: 'spuntino',
          alternatives: [
            {
              id: 'd5-sp-a1',
              foods: [
                { name: 'Shake post-workout', quantity: 35,  unit: 'g',  calories: 133, protein: 25,  carbs: 4,   fat: 2   },
                { name: 'Banana',             quantity: 130, unit: 'g',  calories: 119, protein: 1.5, carbs: 27,  fat: 0.4 },
              ],
            },
            {
              id: 'd5-sp-a2',
              foods: [
                { name: 'Pane integrale',     quantity: 60,  unit: 'g',  calories: 138, protein: 5,   carbs: 26,  fat: 1.5 },
                { name: 'Burro di arachidi',  quantity: 30,  unit: 'g',  calories: 180, protein: 6.8, carbs: 5.3, fat: 15  },
                { name: 'Miele',              quantity: 10,  unit: 'g',  calories: 30,  protein: 0,   carbs: 8,   fat: 0   },
              ],
            },
          ],
        },
        {
          id: 'd5-cena',
          name: 'Cena',
          timeOfDay: 'cena',
          alternatives: [
            {
              id: 'd5-ce-a1',
              foods: [
                { name: 'Salmone',            quantity: 180, unit: 'g',  calories: 370, protein: 35,  carbs: 0,   fat: 25  },
                { name: 'Patate dolci',       quantity: 250, unit: 'g',  calories: 215, protein: 4,   carbs: 50,  fat: 0.3 },
                { name: 'Broccoli',           quantity: 150, unit: 'g',  calories: 51,  protein: 4.3, carbs: 8.3, fat: 0.6 },
              ],
            },
            {
              id: 'd5-ce-a2',
              foods: [
                { name: 'Pizza proteica',     quantity: 1,   unit: 'pz', calories: 420, protein: 32,  carbs: 55,  fat: 8   },
                { name: 'Insalata verde',     quantity: 100, unit: 'g',  calories: 15,  protein: 1.5, carbs: 2.5, fat: 0.2 },
              ],
            },
          ],
        },
      ],
    },
  ],
}
