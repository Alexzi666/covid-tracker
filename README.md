#  --Covid Tracker Web Application-- 
## Developed by Bingjie(Alex) Zi

### Language: Javascript
### Framework Used: React, Express

- --
## Application Description:
- This application serves as a covid-19 data visulization platform for users to visulize real-time covid-19 data for a specfic country/province.
- Fetching third party API(disease.sh) calls in the backend by using node-fetch library.
- Enforced both frontend/backend authentication and input data validation by setting up allow list both in the frontend/backend.
- Built REST APIs with Node.js to support third party API calls, set up routes with Express.js middleware.
- Designed and built responsive (Desktop > 1080px; 900px <= Mobile <= 1080px)AJAX frontend page using React.
- --
## How to Use the Covid-Tracker App
 The App is consist of three parts. The top part, left part, and the right part.
## 1.  The Top Part:
>  ### The top part is consist of the App header line, two dropdown selection(one for filtering country, one for filtering province; if the data of the selected province is provided by "disease.sh", the app will provide another drowdown selection box right next to province box for filtering a specific date's data)
## 2. The Left Part:
> ### The left part is a Healthnote that allows users to create their own account and record their symptoms. Enforced username validation in both frontend/backend, only letters(both capital and uncapital) and one space is allowd, max lenth of username is 12. The Healthnote requires a symptom input, and Level of Severity(LOS) is optional, user can only choose LOS from the five provided levels(both cap/uncap case): Critical/Major/Moderate/Minor/Cosmetic. If a LOS is not provided, then a default case "Minor" will be applied to this entry. The five different LOS are styled in five distinct colors. After successfully submit an entry, user can delete this entry by clicking the delete button. After all, the user is also able to logout by clicking the logout button on the upper right corner in this part.
## 3. The Right Part:
> ### The right part is a live cases table that display the total live cases of different country in a descending order maner

## 4. Implemented a loading indicator while fetching thrid party API calls from backend
- --

All the live data are from "https://disease.sh/", including flag picture of all the countries.
