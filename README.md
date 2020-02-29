# bike-control

A mobile app to show reports of bike assaults and to keep track of your own!

## Intro

The web app is develop with Node.js on the back and using Express for the server. 

We have 3 collections on our DB to store Users, Bikes, and Reports!

The user can send up a report and park his bikes. The bikes of every user are private but the reports are public

## DB Models

The different collections on the DB can be seen here

### Users

The users only have a username, a password and name. The bike and report fields we plan on the future to add, giving more privacy to the data

```
(
  {
    username: { type: String, unique: true },
    name: { first: String, last: String },
    password: String,
    bike: [{ model: String, location: [Number] }],
    reports: [String]
  },
  {
    timestamps: true
  }
);
```
### Bikes
The bikes have a location key (GeoJSON type) and an owner, giving the possibility to retrieve every user bike
```
(
  {
    model: String,
    owner: { type: mongoose.Types.ObjectId, ref: "User" },
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        required: false
      }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
        return ret;
      }
    }
  }
);
```

### Reports
The reports are stored as a GeoJSON and they have a 2dsphere index to make geolocation request to the DB
```
(
  {
    location: {
      type: { type: String, default: "Point" },
      coordinates: {
        type: [Number],
        required: false
      }
    },
    properties: {
      incident: { type: String, default: "Theft" }
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.updatedAt;
        delete ret.createdAt;
        return ret;
      }
    }
  }
);

const schhemaWithIndex = schema.index({ location: "2dsphere" });
```
## Made posible by

The images and sounds used in this project belong to it's authors and were only used by educational purposes

## To be continued...

List of thing to do
