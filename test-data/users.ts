export const VALID_USER1 = {
    email: 'user123@example.com',
    password: 'Valid123',
}

let prefix = Date.now();
export let REGISTRATION_VALID_USER_DATA = {
    email: `user${prefix}@example.com`,
    password: "Valid123",
    firstName: "John",
    lastName: "Doe"
}

export let REGISTRATION_INVALID_USER_DATA ={
    email: "invalid-email",
    password: "short",
    firstName: "J",
    lastName: "Доу"
}