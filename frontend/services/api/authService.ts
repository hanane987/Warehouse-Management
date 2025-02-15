
const users = [
    {
        id: 1333,
        name: "Amine Boutaleb",
        dob: "1988-05-02",
        city: "Oujda",
        secretKey: "AH90907J",
        warehouseId: 1999
    },
    {
        id: 1444,
        name: "Karim El Mansouri",
        dob: "1990-09-15",
        city: "Marrakesh",
        secretKey: "RK189987A",
        warehouseId: 2991
    }
];


export const login = async (secretCode: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

   
    const user = users.find(user => user.secretKey === secretCode);
    return user !== undefined; 
};