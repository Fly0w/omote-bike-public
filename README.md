# Omote-Bike

Omote-Bike is a NextJS mobile web app to help keeping track of a sharehouse common bike, with easy timestamping and history tracking.

![](https://github.com/Fly0w/Promptopia/blob/main/Media/Promptopia%20preview.gif)


## Features
The app is powered by NextJS for it's easy-to-use routing and API system. The app features a MongoDB database, managed with the mongoose library.

### Database
The app features a database with 2 models :
- current : to know who is currently using the bike. Updated when pressing "Start" and "Stop"
```javascript
{
  name: 'Florian',
  isUsed: true
}
```

- history : a list of entries of who used the bike, with the start and end using times. It is created and updated when pressing "Start" or "Stop" on the Home screen.
```javascript
{
  name: 'Florian',
  dateStart: 'Mon, Jun 19, 2023 10:07 PM',
  dateEnd: 'Mon, Jun 19, 2023 10:46 PM',
}
```

### Easy-to-use interface

The app only requires the user to type his/her name and press "Start". By doing so, 
- The UI changes to display who is using the bike, with the lock passcode
- A "Stop" Button appears, to end the user's biking session

When the app loads in the user's browser thanks to the useEffect React Hook. It will fetch the data from the database to get the current state of the bike : used or not ? By who ?

```javascript
  useEffect(() => {
    loadInfo()
  }, [])
```

```javascript
// The current information of the bike
{
  name: 'Florian',
  isUsed: true
}
```

It will then decide to display the "Start" interface, or the "Stop" interface

### Conditional rendering and better UX

Because the app fetches the information about the bike to know which interface it has to render, the app will display a simple "Loading" text while the data is being fetched.
Once the data is here, the Start/Stop interface can be displayed accordingly.

![](https://github.com/Fly0w/OmoteBike/blob/main/Media/Promptopia%20preview.gif)

### History

The history page fetches the data from the "history" database, and then, for each entry, a "history card" will be displayed with the name, start date and end date.

This is made possible with the ES6 ".map()" method:

```javascript
import HistoryCard from "@/components/HistoryCard"

<div className="flex flex-col-reverse mx-3 w-full px-3">
 {history.map((hist) => <HistoryCard *Props* />)}
</div>
```
![](https://github.com/Fly0w/OmoteBike/blob/main/Media/Promptopia%20preview.gif)
