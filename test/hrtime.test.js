const { describe, it } = require("mocha")
const { expect } = require("chai")
const rewire = require("rewire");
const hrtime = rewire("../src/hrtime");

let revert;

describe("hrtime", function(){

  beforeEach(function(){
    revert && revert();
  })

  describe("uses process.hrtime time by default", function(){
    it("should call process.hrtime once", function(done){
      revert = hrtime.__set__("process.hrtime", () => {
        done()
      })
      const clock = hrtime();
      clock();
    })
    it("should return an absolute time in ns if called with no arg", function(){
      const currentTime = [2 /* s */, 31415926 /* ns */]
      revert = hrtime.__set__("process.hrtime", () => currentTime)
      const clock = hrtime();
      const currentTimeNs = clock();
      expect(currentTimeNs).to.equal(2031415926)
    })
    it("should return a delta in ns if called with arg", function(){
      const currentTime =  [3 /* s */, 27182818 /* ns */]
      const previousTime = 2031415926 // ns
      revert = hrtime.__set__("process.hrtime", () => currentTime)
      const clock = hrtime();
      const deltaTimeNs = clock(previousTime);
      expect(deltaTimeNs).to.equal(995766892)
    })
  })

  describe("uses performance.now if process.hrtime is unavailable", function(){
    it("should call performance.now once", function(done){
      revert = hrtime.__set__({
        "process.hrtime": undefined,
        performance: {
          now: () => {
            done();
          }
        }
      })
      const clock = hrtime();
      clock();
    })
    it("should return an absolute time in ns if called with no arg", function(){
      const currentTime = 3.1415926 // ms 
      revert = hrtime.__set__({
        "process.hrtime": undefined,
        performance: {
          now: () => currentTime
        }
      })
      const clock = hrtime();
      const currentTimeNs = clock();
      expect(currentTimeNs).to.equal(3141592.6)
    })
    it("should return a delta in ns if called with arg", function(){
      const currentTime = 2.7182818 // ms 
      const previousTime = 314159.26 // ns
      revert = hrtime.__set__({
        "process.hrtime": undefined,
        performance: {
          now: () => currentTime
        }
      })
      const clock = hrtime();
      const deltaTimeNs = clock(previousTime);
      expect(deltaTimeNs).to.equal(2404122.54)
    })
  })

  describe("uses Date.now if performance.now is unavailable", function(){
    it("should call Date.now once", function(done){
      revert = hrtime.__set__({
        "process.hrtime": undefined,
        Date: {
          now: () => {
            done();
          }
        }
      })
      const clock = hrtime();
      clock();
    })
    it("should return an absolute time in ns if called with no arg", function(){
      const currentTime = 3.1415926 // ms 
      revert = hrtime.__set__({
        "process.hrtime": undefined,
        Date: {
          now: () => currentTime
        }
      })
      const clock = hrtime();
      const currentTimeNs = clock();
      expect(currentTimeNs).to.equal(3141592.6)
    })
    it("should return a delta in ns if called with arg", function(){
      const currentTime = 2.7182818 // ms 
      const previousTime = 314159.26 // ns
      revert = hrtime.__set__({
        "process.hrtime": undefined,
        Date: {
          now: () => currentTime
        }
      })
      const clock = hrtime();
      const deltaTimeNs = clock(previousTime);
      expect(deltaTimeNs).to.equal(2404122.54)
    })
  })
})
