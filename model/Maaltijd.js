class Maaltijd {

  constructor(id, naam, beschrijving, ingedienten, allergie, prijs, userId, studentenhuisId){
    this.id = id;
    this.naam = naam;
    this.ingedienten = ingedienten;
    this.allergie = allergie;
    this.prijs = prijs;
    this.userId = userId;
    this.studentenhuisId = studentenhuisId;
  }

}

module.exports = Maaltijd;
