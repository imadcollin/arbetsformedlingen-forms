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
