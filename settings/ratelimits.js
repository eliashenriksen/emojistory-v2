//Max number of rate limited API requests per the specified time window.
export const maxNumberOfRequests = 50;

//The time window for the rate limited requests. After this time, the requests get reset to the number above.
export const requestResetTimeInSeconds = 60;