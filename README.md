# Arbetsformedlingen Forms

 Arbetsformedlingen-forms är ett formulär bygget med React - applikation då det är det ramverk som används för frontend-applikationer hos Arbetsförmedlingen.

1. Formuläret ges möjlighet att välja medborgarland, en lista på länder kan hämtas via REST-anrop mot den en mock-applikationen. 

2. Anropet är en GET mot http://localhost:8080/api/countries som returnerar en lista på länder i JSON-format. 

3. Den ifyllda informationen i formuläret ska valideras enligt kravdokumentet. 
När all information är ifylld ska innehållet från formuläret skickas i JSON-format med en POST till http://localhost:8080/api/samordningsnummer



## Getting started
1. Download and install [NodeJS](https://nodejs.org) if you don't have it already.

2. Clone the source code from Github. In the terminal type:

 ```
git clone https://github.com/imadcollin/arbetsformedlingen-forms
```

## Dependencies
To install all the needed dependencies use the terminal to `cd` into the project folder and type:

```
npm install
```

## Development
Start the server.

```
npm start
```

Build run

```
npm build
```

## Interfaces 

<img width="105" alt="screen shot 2017-02-24 at 17 16 10" src="https://user-images.githubusercontent.com/15781725/105490030-73b45980-5cb4-11eb-8bf7-e6cdf15faa3f.png">
---
----
<img width="105" alt="screen shot 2017-02-24 at 17 16 40" src="https://user-images.githubusercontent.com/15781725/105490075-84fd6600-5cb4-11eb-9348-8305a8e95ec3.png">
---

----
<img width="105" alt="screen shot 2017-02-24 at 17 16 40" src="https://user-images.githubusercontent.com/15781725/105490079-875fc000-5cb4-11eb-81f7-196e87c5e269.png">

