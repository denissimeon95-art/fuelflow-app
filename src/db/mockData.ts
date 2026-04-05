import type { MealPlan } from '../types'

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
