# 🍽️ Food Location Finder

**A Spring Boot web application for finding food locations based on a given location, built by Team ChefsHouse.**

[Team Jira Board](https://gatech-cs-3300-team.atlassian.net/jira/software/projects/DO/boards/1)

[Team Google Drive Folder](https://drive.google.com/drive/folders/1ox0vkPHtiTBqb879qKNTD0goqUHFb6Hs)

---

## 📋 Project Overview

The **Food Location Finder** is a web application designed to help users discover food locations near a specified area. By inputting a location, the app interacts with the Google Maps API to return a list of nearby food establishments. The project is developed using the **Spring Boot** framework and managed with **Maven**.

---

## 🚀 Features

- 🔍 **Location Search**: Enter a location to find nearby food spots.
- 🗺️ **Google Maps API Integration**: Provides accurate and real-time data of food locations.
- ⚡ **Fast and Scalable**: Built with Spring Boot for optimized performance and scalability.
- 📦 **Maven-Driven**: Uses Maven for easy project build, dependency management, and version control.

---

## 🛠️ Tech Stack

- **Backend Framework**: Spring Boot
- **API**: Google Maps API
- **Build Tool**: Maven
- **Version Control**: GitHub

---

## 📋 Release Notes

Initial Software Release:

* Create account or login to search
* Enter latitude, longitude (in place of the default location of Atlanta), radius, and select number of results to return locations.
* Search results are supported for restaurants, museums, and parks.
* Results are returned in the form of a table and pins are placed on the corressponding map.

Bug Fixes:

* Changed query parameters from location to (lat, lng) to satisfy API call requirements
* Fixed representation of dollar signs.
* Redesigned UI of Login and Create Account pages to be more neat.

Known Bugs / Missing Features:

* Individual search history and loading upon login is a future feature.
* Inconsistent results return times from the API call.

## 📚 Install Guide

**Pre-Requisites**

*SOFTWARE*
In order to run this software the following must be installed
-  npm command line (v7 or later)

*HARDWARE*
Any modern hardware should be sufficient to run the application provided it has the following
- 4 GB RAM


**Requirements**
The following dependent libraries must be installed and added t
- Node.js
- Maven

**How to Run the Project - Download, Build and Run**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/food-location-finder.git
   cd food-location-finder
2. Start the backend first by running the following
   ```bash
   ./mvnw spring-boot:run
4. Start the frontend next by running
   ```bash
   npm install
   npm start
5. You can then go to the localhost link that shows up in the frontend terminal and enjoy!
6. To checkout the deployed app with Google Cloud, visit https://frontend-dot-cs-3300-location-finder.uk.r.appspot.com/

**Trouble Shooting**

1. The most common problem is due to a lack of proper dependencies. Review the Software Requirements earlier in the guide and ensure that all dependencies are present.
   - npm can be checked simply by running npm --v in command line. The command should return a version number.
2. If the dependencies are installed but errors are still occuring, check that all dependencies have been properly added to the system path and are visable to the code base.

