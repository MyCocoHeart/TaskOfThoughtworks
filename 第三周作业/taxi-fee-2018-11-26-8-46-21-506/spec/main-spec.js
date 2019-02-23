const main = require('../main/main');

describe('taxi fee', function () {
    // write your tests here...
    it("returns zero given mileage equal or lesser than 0 and holdTime for any value", function () {
        let mileage = 0;
        let holdTime = 0;
        let result = main(mileage,holdTime);
        expect(result).toBe(0);
    });
     it("returns zero given holdTime equal or lesser than 0 and mileage for any value", function () {
        let mileage = 2;
        let holdTime = -1;
        let result = main(mileage,holdTime);
        expect(result).toBe(0);
    });
      it("returns price given mileage lesser than two and holdTime for any arithmetic number", function () {
        let mileage = 1;
        let holdTime = 2;
        let result = main(mileage,holdTime);
        expect(result).toBe(7);
    });
      it("returns price given mileage greater than two and  equal or lesser than eight and holdTime for any arithmetic number", function () {
        let mileage = 5;
        let holdTime = 3;
        let result = main(mileage,holdTime);
        expect(result).toBe(9);
    });
       it("returns price given mileage greater than eight and holdTime for any arithmetic number", function () {
        let mileage = 10;
        let holdTime = 3;
        let result = main(mileage,holdTime);
        expect(result).toBe(14);
    });
});
