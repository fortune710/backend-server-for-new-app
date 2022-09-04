const { User } = require('./User');
const { Mosque } = require('./Mosque');
const { Prayer } = require('./Prayer');
const { PrayerTime } = require('./PrayerTime');
const { Position } = require('./Position');
const { Followership } = require('./Followership');
const { MosqueAdmins } = require('./MosqueAdmin');
const { Denomination } = require('./Denomination');
const { Book } = require('./Books');
const { MosqueBooks } = require('./MosqueBooks');

const { sequelize } = require('../config/db');


//Relationships for each table according to the ER Model
Prayer.hasOne(PrayerTime, {
    foreignKey: 'prayer_id'
})
PrayerTime.belongsTo(Prayer)

MosqueBooks.hasMany(Book)


Mosque.hasMany(PrayerTime)
PrayerTime.belongsTo(Mosque)

Mosque.hasMany(MosqueBooks)
MosqueBooks.hasMany(Mosque)

Mosque.hasOne(Denomination)
Denomination.belongsTo(Mosque)

Mosque.hasMany(MosqueAdmin)
MosqueAdmins.hasOne(Mosque)

Mosque.hasMany(Followership)
Followership.hasOne(Mosque)



User.hasMany(Followership)
Followership.hasOne(User)

User.hasOne(MosqueAdmin)
MosqueAdmins.hasOne(User)




MosqueAdmins.hasOne(Position, {
    foreignKey: 'position'
})
Position.hasOne(MosqueAdmins)

sequelize.sync()