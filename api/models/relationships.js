const { User } = require('./User');
const { Mosque } = require('./Mosque');
const { Prayer } = require('./Prayer');
const { PrayerTime } = require('./PrayerTime');
const { Position } = require('./Position');
const { Followership } = require('./Followership');
const { MosqueAdmins } = require('./MosqueAdmin');
const { Denomination } = require('./Denomination');


//Relationships for each table according to the ER Model
Prayer.hasOne(PrayerTime, {
    foreignKey: 'prayer_id'
})
PrayerTime.belongsTo(Prayer)



Mosque.hasMany(PrayerTime)
PrayerTime.belongsTo(Mosque)

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
Position.hasOne(MosqueAdmin)