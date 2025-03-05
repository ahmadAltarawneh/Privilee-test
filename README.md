# Brief

## Overview
This is a brief about the automation code I have write for Privilee and explaination

## Tests
You need to run this command to be able to run all the UI tests ```npm run ui-test``` it has been added to the ``package.json`` file
You need to run this command to be able to run all the API tests ```npm run api-test``` it has been added to the ``package.json`` file

### 1. Checking the plan price
This test focus on checking if:
- Join Privilee today button is working fine
- The user is navigated to the signup page
- plan selection is correct
- comparing the plan price to the amount will be deducted from the client

### **why is it important?**
- Ensures that users can successfully navigate to the signup page and select a plan.
- Verifies that the pricing information is accurate and consistent, which is critical for user trust and conversion.

### 2. Checking if the filter feature is visible and working
This test focus on checking if:
- The filter buttons (e.g., "Pool & beach", "Dining") are visible and have the correct attributes.
- The "Filter your search" modal is displayed correctly.
- The filtering options (e.g., "Fine dining") are selectable and visible.

### **why is it important?**
- Ensures that users can easily filter venues based on their preferences, enhancing their browsing experience.
- Verifies the accuracy and visibility of filter options, which is crucial for user satisfaction.

### 3. Performace test
This test measures the performance metrics of the Privilee webpage, specifically the loading time, response time, and DOM content loaded time.

The test should provide detailed performance metrics, including load time, response time, and DOM content loaded time. These metrics should be within acceptable limits:
- Load time: Less than 5000 milliseconds
- Response time: Less than 2000 milliseconds
- DOM content loaded time: Less than 3000 milliseconds

After running the code, you need to run ```npx playwright show-trace trace.zip``` to be able to see the trace file

### **why is it important?**
- User Experience: Performance is a critical factor for user satisfaction. Slow load times can lead to higher bounce rates and lower user engagement.
- Reliability: Ensures the webpage loads efficiently across various conditions, providing a consistent and reliable experience.
- Optimization: By identifying areas where the webpage performs poorly, developers can optimize and improve the overall performance, leading to better user retention and satisfaction.


### 4. Search Functionality and Data Accuracy
This test verifies that the search functionality works correctly and the data displayed is accurate.

The expectation from this test is: 
- The search bar is visible and functional.
- The correct venue ("Dubai ladies club") is found and displayed.
- The modal popup is successfully filled and submitted, leading to the correct URL and success message.
- The displayed information matches the expected data.

### **why is it important?** 
- Ensures that the search functionality is accurate and reliable, enhancing user experience.
- Verifies that the data displayed is accurate and up-to-date, which is crucial for user trust and engagement.



# GoRest API Automation Tests

This repository contains automated tests for the GoRest API using Playwright in TypeScript. The tests validate various endpoints, create users with dynamic emails, and ensure data consistency and correctness.

We can store the created users and the posts in a JSON files for the records to return them again later on on the E2E testing
