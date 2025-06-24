// Car class
class Car {
  #plateNumber
  #timeStamp
  #merk

  constructor(plateNumber, timeStamp, merk) {
    this.#plateNumber = plateNumber;
    this.#timeStamp = timeStamp;
    this.#merk = merk;
  }

  getPlateNumber() {
    return this.#plateNumber;
  }

  getTimeStamp() {
    return this.#timeStamp;
  }

  getMerk() {
    return this.#merk;
  }

  getCarInfo() {
    return {
      plateNumber: this.#plateNumber,
      timeStamp: this.#timeStamp,
      merk: this.#merk,
    };
  }
}

// ParkingLot class
class ParkingLot {
  constructor(id, capacity) {
    this.id = id;
    this.capacity = capacity;
    this.parkingSpot = new Map();
  }

  park(car) {
    if (this.hasCar(car.plateNumber)) {
      console.log(`Mobil dengan plat ${car.plateNumber} sudah parkir di ${this.id}`);
      return null;
    }

    if (this.parkingSpot.size + 1 > this.capacity) {
      throw new Error("Parkir Penuh");
    }

    this.parkingSpot.set(car.plateNumber, car);

    const ticket = {
      platNumber: car.plateNumber,
      timeStamp: car.timeStamp,
      carMerk: car.merk,
    };

    return ticket;
  }

  unpark(car) {
    if (!this.hasCar(car.plateNumber)) {
      return null;
    }

    this.parkingSpot.delete(car.plateNumber);
    return `Mobil dengan plat ${car.plateNumber} telah keluar dari ${this.id}`;
  }

  hasCar(plateNumber) {
    return this.parkingSpot.has(plateNumber);
  }

  getCapacityInfo() {
    return {
      id: this.id,
      capacity: this.capacity,
      occupied: this.parkingSpot.size,
      available: this.capacity - this.parkingSpot.size,
    };
  }
}

// ParkingAttendant class
class ParkingAttendant {
  constructor(name) {
    this.name = name;
    this.parkingLots = [];
  }

  addParkingLot(lot) {
    this.parkingLots.push(lot);
  }

  parkCar(car) {
    for (let i = 0; i < this.parkingLots.length; i++) {
      const lot = this.parkingLots[i];

      if (!lot.hasCar(car.plateNumber) && lot.parkingSpot.size < lot.capacity) {
        const ticket = lot.park(car);
        console.log("Parkir berhasil\nTiket:", ticket);
        return ticket;
      }
    }

    console.log("Semua parkiran penuh atau mobil sudah parkir sebelumnya");
    return null;
  }

  unparkCar(car) {
    for (let i = 0; i < this.parkingLots.length; i++) {
      const lot = this.parkingLots[i];
      if (lot.hasCar(car.plateNumber)) {
        const msg = lot.unpark(car);
        console.log(msg);
        return msg;
      }
    }
    console.log("Mobil tidak ditemukan di semua parkiran");
    return null;
  }

  showAllCapacity() {
    console.log("--- KAPASITAS SETIAP PARKIRAN ---");
    this.parkingLots.forEach((lot) => {
      const info = lot.getCapacityInfo();
      console.log(`Parkiran ${info.id} kapasitas: ${info.capacity}, terisi: ${info.occupied}, sisa: ${info.available}`);
    });
  }
}

// Simulasi
const lt1 = new ParkingLot("Lantai 1", 5);
const lt2 = new ParkingLot("Lantai 2", 4);
const lt3 = new ParkingLot("Lantai 3", 2);

const petugas = new ParkingAttendant("Andi");
petugas.addParkingLot(lt1);
petugas.addParkingLot(lt2);
petugas.addParkingLot(lt3);

const cars = [
  new Car("D 1001 AAA", new Date(), "Xpander").getCarInfo(),
  new Car("D 1002 BBB", new Date(), "Xforce").getCarInfo(),
  new Car("D 1003 CCC", new Date(), "Pajero").getCarInfo(),
  new Car("D 1004 DDD", new Date(), "Innova").getCarInfo(),
  new Car("D 1005 EEE", new Date(), "Civic").getCarInfo(),
  new Car("D 1006 FFF", new Date(), "Brio").getCarInfo(),
  new Car("D 1007 GGG", new Date(), "Agya").getCarInfo(),
  // new Car("D 1008 HHH", new Date(), "Ayla").getCarInfo(),
  // new Car("D 1009 III", new Date(), "CRV").getCarInfo(),
  // new Car("D 1010 JJJ", new Date(), "HRV").getCarInfo(),
  // new Car("D 1011 KKK", new Date(), "Alphard").getCarInfo(),
  // new Car("D 1012 LLL", new Date(), "Fortuner").getCarInfo(),
];

console.log("--- PARKIR VIA PETUGAS ---");
cars.forEach((car) => petugas.parkCar(car));

console.log("");
petugas.showAllCapacity();