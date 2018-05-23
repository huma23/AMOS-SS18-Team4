# Planungstafel

This project is an open source web application that let the user create a digital whiteboard for planing tasks in craft 
businesses.

## Prerequisites

- Node.js
- Maven
- Java 1.8
- Git

## Setup

1. Run `git clone https://github.com/huma23/AMOS-SS18-Team4.git`
2. Create a new Google App Engine Project
3. Insert your project id into `src\main\webapp\WEB-INF\appengine-web.xml`
4. Insert your project id into `pom.xml`
5. Insert your secret for token creation into the class `src\main\java\de\amos\mamb\session\TokenManager.java` 

## Overview

- `src` - root source directory for backend and frontend
- `src\main\java\` - source directory for the java backend
- `src\main\angular\` - source directory for the angular frontend
- `ngtarget` - output directory for the frontend application (will be copied to `src\main\webapp` on deployment)
- `target` - output directory for the war-file

Note:
- The dependencies of the backend application are controlled via maven in the project root directory
- The dependencies of the frontend application are controlled via npm in the `src\main\angular\` directory.

## Build & Deploy - Local

Run `mvn appengine:devserver`

Note: Some features (like datastore) can not be used local at the moment.


## Build & Deploy - App Engine

Run `mvn appengine:update`

## Running Frontend with FakeBackend

Install Cors Extension to Allow Control-Allow-Origin to enable calls to extern Web Domains. 
Run within angular folder 'ng serve'.
The Application will forward your call from /api to an running Backend instance, 
the adress can be modified within `environments/environment.ts` 


## Tests

TODO
