# Awesome App Alias Authoring Angular App

A crazy app idea generator I made for the CODE Network 2018 showcase (because I couldn't think of an idea for an app to present in the first place.)

You can build it yourself, or have a look at the thing live, [right here.](http://bennetthardwick.com/projects/app-names)

## Running

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. If you want to build the app run `ng build`.

## How It Works

Each sentence is essentially a journey across a directed graph which controls the grammar. When the app reaches a node that has more than one child node, it chooses a path randomly, each with equal probability. This continues until the app reaches the end of the graph and the random sentence is generated.

## Generating Ideas

It's super easy! Just press the 'generate' button.

## Adding Data

I use [this d3 application](https://bl.ocks.org/cjrd/6863459) to define the grammar for the app ([you can find the exported JSON here](https://gist.github.com/bennetthardwick/ec1984f8c04b30495e59cc83de701c77)). I also use this [dictionary file](https://gist.github.com/bennetthardwick/0a51d675d72ed056db78bdea5d5b4a55). If you fork the gists, you can add them into your version of the app [here!](http://bennetthardwick.com/projects/app-names/#/settings)


## Built With
- [Angular](https://github.com/angular/angular)
- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material2](https://github.com/angular/material2)
- [NeDB](https://github.com/louischatriot/nedb) (don't ask why...)

## Examples
- Press the 'generate' button for a new app idea 
![Press 'generate' to generate](https://i.imgur.com/lQLtOaM.png)
- Try and develop a calendar app for forgetting your Twitter handle
![Forget your twitter handle](https://i.imgur.com/zPdqjHL.png)
- Try and develop Slack but for insurance premiums
![](https://i.imgur.com/7UqqpLQ.png)
