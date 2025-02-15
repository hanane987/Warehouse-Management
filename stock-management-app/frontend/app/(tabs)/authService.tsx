// authService.ts
const users = [
    { id: 1, secretCode: '1234' },
   
];

export const login = async (secretCode: string) => {
    const user = users.find(user => user.secretCode === secretCode);
    return user ? true : false; 
};