import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  profiles: '++id, fullName, experienceTitles, experienceDates, educationTitles, educationDates, contactInfo' // Primary key and indexed props
});