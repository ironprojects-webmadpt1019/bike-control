# bike-control

A mobile app to show reports of bike assaults and to keep track of your own!

[![](https://i.imgur.com/GO2uOT2.png)](https://bike-control.herokuapp.com)

## What is bike-control 

It's an app that displays recorded reports of bike-related incidents. 

To use it you have to register, once you're in you can view every report ever recorded, create your own and add bikes so you can keep track of their location. Every time you want to park a bike our algorithms will let you know if it's a sure place! 

The layout is a map that displays points on different types of reports. You can also view your bikes and give them located on the map. Finally, we've added a heat map to let you see the hotspots of bike incidents everywhere! 

## How does it work

The server side of the app was developed with express, managing user auth with passport. 

The DB has 3 collections: bikes, users, reports.

Each collection gives the ability to store the data necessary to give form to the app.

Each view is rendered with handlebars and the front-end logic is used to set buttons to navigate the app

### DataBase

The different collections are shown 👇🏻

#### Users

The users only have a username, a password, and a name. The bike and report fields we plan on the future to add, giving more privacy to the data. They can be created and updated but not deleted

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
#### Bikes

The bike model has an owner that sets a relation with the user, it also has a GeoJSON type field for location. 

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

#### Reports

Finally, the report model is a GeoJSON with the location and property to indicate what type of incident it is! To use a geospatial query it's necessary to create a 2dsphere index!!! 

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
### Map rendering 

On the main page a map is shown (we use Mapbox), it has red, orange and yellow dots referring to the incidents; it also has green dots to show the user's bikes.

To collect the data for the map an AJAX request is sent to the server, retrieving all of the incidents

Once the incidents are loaded a source is added and then a layer rendered.


```
map.on("load", function() {
    //paint UserReports
    reportsApi.get().then(res => {
      const reports = res.data;

      const data = reports.map(e => ({
        type: "Feature",
        geometry: e.location,
        properties: e.properties
      }));

      map.addSource("reports", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: data
        }
      });
      map.addLayer({
        id: "reports",
        type: "circle",
        source: "reports",
        paint: {
          // make circles larger as the user zooms from z12 to z22
          "circle-radius": {
            base: 1.75,
            stops: [
              [12, 2],
              [22, 180]
            ]
          },
          "circle-color": [
            "match",
            ["get", "incident"],
            "Theft",
            "#cf000f",
            "Damage",
            "#f9690e",
            "Other",
            "#eeee00",
            "#ccc"
          ],
          "circle-opacity": 0.5
        }
      });
```

The same logic is applied to render each bike on the map. Only this time we only retrieve the user's registered bikes.

The last added feature is a heat map, if you zoom out you'll see it 🤓

### Layout

Te layout was designed with mobile in mind, managing to make it as responsive as possible without media-queries.

That being said, the design has much more range to be improved!

### APIs

We had to develop a couple of APIs to give the posibility to render the bike and report data on the front. Also it can help to do more single-page animations in the future!

## TO DO (More work in the future 💪🏻)

* Add mail confirmation services on register and password update feature. Also it would be nice to implement two password input to check if its correctly written.
* The design can improve, making it more usefull on desktop.
* Talking of layout, the need of a light theme on daylight would be helpfull!
* To improve the UI more task can be rendered on a single page, eliminating the need of change the route on the app 

All of the ideas are welcome!

## License

Please refer to [LICENSE.md](https://github.com/ironprojects-webmadpt1019/bike-control/blob/master/LICENSE.md)

## Contributing

If you want to contributed to this projects, please. Are yourself to [CONTRIBUTING.md](https://github.com/ironprojects-webmadpt1019/bike-control/blob/master/CONTRIBUTING.md)

## Team

<div><p>Author: <a href="https://github.com/albertiri-gomez">Alberto Gómez</a></p></div>
<div><p>Author: <a href="https://github.com/luismiguelfeijoo">Luis Miguel Feijoo</a></p></div>
