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

**New Features**

- Added Login System that allows for the verification of users
- Enhanced UI font for a more readable interface
- Added filters to search locations based on parks, restaurants and museums.

**Bug Fixes + Known Bugs**
*FIXES*
- The system no longer accepts passwords less then 8 charchters. Previously, they could be created but not used, resulting in an invalid account.

*KNOWN BUGS*
- Searching for museums with an exact radius of 1 causes an application crash
- Users are sometimes not properly added to the user system and the account will have to be recreated
- The original documentation included sorting my monuments, this was later replaces with museums and parks for this version of the app, as they saw higher demand.

---

## 📚 Install Guide

**Pre-Requisites**

*SOFTWARE*
In order to run this software the following must be installed
-  npm command line (v7 or later)


*HARDWARE*
Any modern hardware should be sufficient to run the application provided it has the following
- 4 GB RAM
- Internet Connection


**Requirements**
The following dependent libraries must be installed and added t
- Node.js
- Maven

**How to Run the Project - Download, Build and Run**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/food-location-finder.git
   cd food-location-finder
2. Run npm install
3. Run npm start

**Trouble Shooting**


*Why is the code not compiling when I run npm init?*

1. The most common problem is due to a lack of proper dependencies. Review the Software Requirements earlier in the guide and ensure that all dependencies are present.
   - npm can be checked simply by running npm --v in command line. The command should return a version number.
2. If the dependencies are installed but errors are still occuring, check that all dependencies have been properly added to the system path and are visable to the code base.

*I have sucessfully loaded the application but the location search is returning "No Reponse Recieved". Why is this occuring?*

The SpringBoot application was incorectly launched. Please ensure that step of the build guide was performed.


