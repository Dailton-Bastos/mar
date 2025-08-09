/**
 * The route for the login page
 * This route does not require authentication
 * @type {string}
 */

export const loginRoute: string = '/';

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after loggin in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = '/home';
