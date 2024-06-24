export type Token = {
    email: string
    userlevel: string
    iconSrc: string
}


export const setTime = (time: any) => {
    // Assuming timestamp is in milliseconds
    const timestamp = parseInt(time); // Example timestamp
    const date = new Date(timestamp);
    // Now you can use various methods of the Date object to get different parts of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-based, so add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // You can format the date as needed
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;

}