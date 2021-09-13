import { getters, stateConfig } from '@/store/index.js';
import { clone, evolve } from 'ramda';

describe('Testing store', () => {
  describe('getters', () => {
    const defaultState = clone(stateConfig);

    const defaultGettersState = {
      notaryCosts: null,
      rawLoanAmount: null,
      loanToValue: null,
      brokerCosts: null,
      stampDutyCosts: null,
      totalCost: null
    };

    describe('notaryCosts', () => {
      const getter = getters.notaryCosts;

      it('returns null if propertyPurchasePrice(in default state) is not set', () => {
        expect(getter(defaultState, defaultGettersState)).toEqual(null);
      })

      it('returns 2144 if propertyPurchasePrice is set to 100000', () => {
        const state = evolve(
          defaultState,
          { form: { propertyPurchasePrice: 100000 }}
        )

        expect(getter(state, defaultGettersState)).toEqual(2144);
      })

      it('returns 1494 if propertyPurchasePrice is set to 50000', () => {
        const state = evolve(
          defaultState,
          { form: { propertyPurchasePrice: 50000 } }
        )
        expect(getter(state, defaultGettersState)).toEqual(1494);
      })

      it('returns 2791 if propertyPurchasePrice is set to 150000', () => {
        const state = evolve(
          defaultState,
          { form: { propertyPurchasePrice: 150000 } }
        )
        expect(getter(state, defaultGettersState)).toEqual(2794);
      })
    });

    describe('brokerCosts', () => {
      const getter = getters.brokerCosts;

      it('returns 7140 if propertyPurchasePrice is set to 100000 and real estate commision is set to true', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000,
              realEstateCommision: true
            }
          }
        );
        expect(getter(state, defaultGettersState)).toEqual(7140);
      });

      it('returns 0 if propertyPurchasePrice is set to 100000 and real estate commision is set to false', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000,
              realEstateCommision: false
            }
          }
        );
        expect(getter(state, defaultGettersState)).toEqual(0);
      });

      it('returns null if propertyPurchasePrice is not set', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              realEstateCommision: true
            }
          }
        );
        expect(getter(state, defaultGettersState)).toEqual(null);
      });

      it('returns null in default state', () => {
        expect(getter(defaultState, defaultGettersState)).toEqual(null);
      });
    });

    describe('stampDutyCosts', () => {
      const getter = getters.stampDutyCosts;

      it('returns null in default state', () => {
        expect(getter(defaultState, defaultGettersState)).toEqual(null);
      });

      it('returns 6000 if propertyPurchasePrice is 100000', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000
            }
          }
        );

        expect(getter(state, defaultGettersState)).toEqual(6000);
      });
    });

    describe('totalCost', () => {
      const getter = getters.totalCost;

      it('returns null in default state', () => {
        expect(getter(defaultState, defaultGettersState)).toEqual(null);
      });

      it('returns null when stampDutyCosts are not calculated', () => {
        const gettersState = evolve(
          defaultGettersState,
          {
            notaryCosts: 1000,
            brokerCost: 2000,
            stampDutyCosts: null
          }
        )

        expect(getter(defaultState, gettersState)).toEqual(null);
      });

      it('returns null when brokerCost are not calculated', () => {
        const gettersState = evolve(
          defaultGettersState,
          {
            notaryCosts: 1000,
            brokerCosts: null,
            stampDutyCosts: 3000
          }
        )

        expect(getter(defaultState, gettersState)).toEqual(null);
      });

      it('returns null when notaryCosts are not calculated', () => {
        const gettersState = evolve(
          defaultGettersState,
          {
            notaryCosts: null,
            brokerCosts: 2000,
            stampDutyCosts: 3000
          }
        )

        expect(getter(defaultState, gettersState)).toEqual(null);
      });

      it('returns the sum of costs when all costs are calculated', () => {
        const gettersState = evolve(
          defaultGettersState,
          {
            notaryCosts: 1000,
            brokerCosts: 2000,
            stampDutyCosts: 3000
          }
        )

        expect(getter(defaultState, gettersState)).toEqual(6000);
      });

      it('returns the sum of costs when all costs are calculated(even if broker cost is zero)', () => {
        const gettersState = evolve(
          defaultGettersState,
          {
            notaryCosts: 1000,
            brokerCosts: 0,
            stampDutyCosts: 3000
          }
        )

        expect(getter(defaultState, gettersState)).toEqual(4000);
      });
    });

    describe('rawLoanAmount', () => {
      const getter = getters.rawLoanAmount;

      it('returns null in default state', () => {
        expect(getter(defaultState, defaultGettersState)).toEqual(null);
      });

      it('returns null if totalCost is not calculated', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000,
              totalSavings: 50000
            }
          }
        );
        expect(getter(state, defaultGettersState)).toEqual(null);
      });

      it('returns null if totalSavings are not set', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000
            }
          }
        );
        const gettersState = evolve(
          defaultGettersState,
          {
            totalCost: 10000
          }
        )
        expect(getter(state, gettersState)).toEqual(null);
      });

      it('returns null if propertyPurchasePrice is not set', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              totalSavings: 50000
            }
          }
        );
        const gettersState = evolve(
          defaultGettersState,
          {
            totalCost: 10000
          }
        )
        expect(getter(state, gettersState)).toEqual(null);
      });

      it('returns correct result of the calculation, whan all the needed properties are set', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000,
              totalSavings: 50000
            }
          }
        );
        const gettersState = evolve(
          defaultGettersState,
          {
            totalCost: 10000
          }
        )
        expect(getter(state, gettersState)).toEqual(60000);
      });
    });

    describe('loanToValue', () => {
      const getter = getters.loanToValue;

      it('returns null in default state', () => {
        expect(getter(defaultState, defaultGettersState)).toEqual(null);
      });

      it('returns null if raw amount is not calculated', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000
            }
          }
        );
        expect(getter(state, defaultGettersState)).toEqual(null);
      });

      it('returns null if propertyPurchasePrice is not set', () => {
        const gettersState = evolve(
          defaultGettersState,
          {
            form: {
              rawLoanAmount: 110000
            }
          }
        )
        expect(getter(defaultState, gettersState)).toEqual(null);
      });

      it('returns ratio of rawLoanAmount/propertyPurchasePrice if those are set', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 100000
            }
          }
        );

        const gettersState = evolve(
          defaultGettersState,
          {
            rawLoanAmount: 110000
          }
        );
        expect(getter(state, gettersState)).toEqual(1.1);
      });

      it('returns null propertyPurchasePrice is zero', () => {
        const state = evolve(
          defaultState,
          {
            form: {
              propertyPurchasePrice: 0
            }
          }
        );

        const gettersState = evolve(
          defaultGettersState,
          {
            rawLoanAmount: 110000
          }
        );
        expect(getter(state, gettersState)).toEqual(null);
      });
    });

    describe('preparedTableEntries', () => {
      const getter = getters.preparedTableEntries;

      it('returns empty array in default state', () => {
        expect(getter(defaultState, defaultGettersState)).toEqual([]);
      })

      it('returns records ready for the table if tableData is populated', () => {
        const state = evolve(
          defaultState,
          {
            tableData: {
              "ratesTable": {
                "5": {
                  "borrowingRate": 0.7,
                  "monthlyRate": 710.24
                },
                "10": {
                  "borrowingRate": 0.75,
                  "monthlyRate": 723.39
                },
                "15": {
                  "borrowingRate": 1.04,
                  "monthlyRate": 799.68
                },
                "20": {
                  "borrowingRate": 1.32,
                  "monthlyRate": 873.33
                },
                "25": {
                  "borrowingRate": 1.89,
                  "monthlyRate": 1023.27
                },
                "30": {
                  "borrowingRate": 1.94,
                  "monthlyRate": 1036.43
                }
              }
            }
          }
        );

        const result = [
          {
            years: "5",
            borrowingRate: 0.7,
            monthlyRate: 710.24
          },
          {
            years: "10",
            borrowingRate: 0.75,
            monthlyRate: 723.39
          },
          {
            years: "15",
            borrowingRate: 1.04,
            monthlyRate: 799.68
          },
          {
            years: "20",
            borrowingRate: 1.32,
            monthlyRate: 873.33
          },
          {
            years: "25",
            borrowingRate: 1.89,
            monthlyRate: 1023.27
          },
          {
            years: "30",
            borrowingRate: 1.94,
            monthlyRate: 1036.43
          }
        ]

        expect(getter(state, defaultGettersState)).toEqual(result);
      })
    })
  })
})
