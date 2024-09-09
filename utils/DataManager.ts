
import { toast } from 'react-toastify';
import { Base64 } from 'js-base64';
import Router, { useRouter } from 'next/router';


import { useQuery, useMutation, useSubscription } from '@apollo/client';
import {
    GET_CHILD_INVENTORY,
    GET_CATEGORY,
    GET_RELATED_PRODUCTS,
    GET_VIEW_PRODUCT,
    GET_LOGIN,
    GET_NAME_OF_STORE,
    GET_PRODUCT_TYPES,
    MANAGEMENT_INVENTORY,
    GET_CHILD_INVENTORY_DETAIL,
    INSERT_CHILD_INVENTORY,
    INSERT_VIEWS_COUNT,
    INSERT_VISITS,
    GET_ACCOUNTS,
    UPDATE_CHILD_INVENTORY,
    UPDATE_PARENT_INVENTORY,
    GET_BRANDS,
    GET_NUM_OF_VIEWS, GET_LOCATION_DATA, SAVE_CROP_IMAGE,
    GET_INVENTORY_SUB_IMAGES,
    GET_ACCOUNT_DETAILS,
    GET_WEBSITE_VISITS,
    GET_ACCOUNT_DETAILS_ID
} from 'graphql/queries';
import client from 'client';
class DataManager {
    //************************************************* MANAGEMENT START ***********************************************/
    // public Inventory(EmailAddress: any) {
    //     const { data, loading, error } = useQuery(MANAGEMENT_INVENTORY, {
    //         variables: {
    //             emailAddress: EmailAddress
    //         }
    //     });
    //     if (error) return
    //     return { "Inventory": data, "loading": loading, "error": error }
    // }
    // public ManagementChildInventory(styleCode: any) {
    //     const { data, loading, error } = useQuery(GET_CHILD_INVENTORY_DETAIL, { variables: { styleCode: styleCode } });
    //     if (error) return
    //     return { "childInventory": data, "loading": loading, "error": error }
    // }
    // public ManagementInsertInventory() {
    //     let [insertInventory] = useMutation(INSERT_INVENTORY, {
    //         onCompleted: data => console.log(data)
    //     })
    //     return insertInventory
    // }
    // public ManagementInsertChildInventory() {
    //     let [insertChildInventory] = useMutation(INSERT_CHILD_INVENTORY, {
    //         onCompleted: data => console.log(data)
    //     })
    //     return insertChildInventory
    // }
    // public ManagementAccount() {
    //     const { data, loading, error } = useQuery(GET_ACCOUNTS);
    //     if (error) return
    //     return { "Account": data, "loading": loading, "error": error }
    // }
    // public ManagementUpdate() {
    //     let [UpdateChildInventory] = useMutation(UPDATE_CHILD_INVENTORY, {
    //         onCompleted: data => console.log(data)
    //     })
    //     return UpdateChildInventory
    // }
    // public ManagementParentUpdate() {
    //     let [UpdateParentInventory] = useMutation(UPDATE_PARENT_INVENTORY, {
    //         onCompleted: data => console.log(data)
    //     })
    //     return UpdateParentInventory
    // }
    // public ManagementProductTypes() {
    //     const { data, loading, error } = useQuery(GET_PRODUCT_TYPES);
    //     return { "Product_Type": data, "loading": loading, "error": error }
    // }
    // public ManagementBrand() {
    //     const { data, loading, error } = useQuery(GET_BRANDS);
    //     return { "Brands": data, "loading": loading, "error": error }
    // }
    public ManagementUploadCropImage() {
        const { data, loading, error } = useQuery(GET_BRANDS);
        return { "Brands": data, "loading": loading, "error": error }
    }
    public saveCropBlob() {
        const [saveCrop] = useMutation(SAVE_CROP_IMAGE, {
            onCompleted: data => console.log(data, "<<<<<")
        })
        return saveCrop;
    }
    //************************************************* MANAGEMENT END ***********************************************/

    //************************************************* FRONT END START ****************************************************/
    public AccountDetails_id(id: any) {
        const { data, loading, error } = useQuery(GET_ACCOUNT_DETAILS_ID, { variables: { getAccountDetailsIdId: id } });
        console.log(data)
        return { "AccountDetails": data, "loading": loading, "error": error }
    }
    public AccountDetails() {
        const { data, loading, error } = useQuery(GET_ACCOUNT_DETAILS);
        console.log(data)
        return { "AccountDetails": data, "loading": loading, "error": error }
    }
    public nameOfStore() {
        const { data, loading, error } = useQuery(GET_NAME_OF_STORE);
        if (error) return
        return { "Store": data, "loading": loading, "error": error }
    }
    public productRelated() {
        let JSON_DATA = {
            "skip": "0",
            "take": "0"
        }

        const { data, loading, error } = useQuery(GET_RELATED_PRODUCTS);
        if (error) return
        return { "Products": data, "loading": loading, "error": error }
    }
    public viewedProduct(id: number) {
        let JSON_DATA = {
            "getToviewProductId": id
        }

        const { data, loading, error } = useQuery(GET_VIEW_PRODUCT, {
            variables: JSON_DATA
        });
        return {
            "ViewedProducts": data,
            "Viewedloading": loading,
            "Viewederror": error
        }
    }
    public category() {
        const { data, loading, error } = useQuery(GET_CATEGORY);
        return { "Category": data, "loading": loading, "error": error }
    }
    public productThumbnail() {
        let JSON_DATA = {
            "skip": "",
            "take": ""
        }
        const { data, loading, error } = useQuery(GET_CHILD_INVENTORY, {
            variables: JSON_DATA,
        });
        if (error) return { "Products": null, "loading": null, "error": null }
        return { "Products": data, "loading": loading, "error": error }
    }
    public async ManagementLogin(username: any, password: any) {
        let JSON_DATA = {
            "username": username,
            "password": password
        }

        const data = await client.query({
            query: GET_LOGIN,
            variables: JSON_DATA
        })

        console.log(data);
        return { "response": data }
    }
    public InsertViews() {
        let [insertviewcount] = useMutation(INSERT_VIEWS_COUNT, {
            onCompleted: data => console.log(data)
        })
        return insertviewcount
    }
    public InsertVisits() {
        let [insertvisitcount] = useMutation(INSERT_VISITS, {
            onCompleted: data => console.log(data)
        })
        return insertvisitcount
    }
    public async Ipaddress() {
        const data = await fetch('https://api.ipify.org?format=json').then(response => response.json())
        return { "ipAddress": data.ip };
    }
    public LocationData(ipAddress: any) {
        // const ipAddressData = await fetch('https://api.ipify.org?format=json').then(response => response.json())
        const { data, loading, error } = useQuery(GET_LOCATION_DATA, { variables: { ipAddress: ipAddress } });
        // if(loading) return
        console.log(data)
        return { "Location_Data": data, "LocationDataLoading": loading, "LocationDataError": error }

    }
    public NumberOfViews() {
        const { data, loading, error } = useQuery(GET_NUM_OF_VIEWS);
        return { "NumberOFViews": data, "LoadingNumberOFViews": loading, "ErrorNumberOFViews": error }
    }
    public WebsiteVisit() {
        const { data, loading, error } = useQuery(GET_WEBSITE_VISITS);
        return { 'NumberOFVisits': data, "LoadingNumberOFVisits": loading, "ErrorNumberOFViews": error }
    }
    public InventorySubImages() {
        const { data, loading, error } = useQuery(GET_INVENTORY_SUB_IMAGES);
        if (error) return { "ImageData": null, "loading": null, "error": null }
        return { "ImageData": data, "loading": loading, "error": error }
    }
    public Success(message: any) {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    public Promise(message: any) {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    public Warning(message: any) {
        toast.warn(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    public Error(message: any) {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    //************************************************* FRONT END END ************************************************* */
    public setSharedCookie = (name: string, value: string, daysToExpire: number, domain: string) => {
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + daysToExpire);

        const encodedValue = Base64.encode(value);
        const numChunks = Math.ceil(encodedValue.length / 3800);

        for (let i = 0; i < numChunks; i++) {
            const chunk = encodedValue.substring(i * 3800, (i + 1) * 3800);
            const chunkName = `${name}_${i}`;
            const cookieValue = `${encodeURIComponent(chunkName)}=${encodeURIComponent(chunk)}; expires=${expiration.toUTCString()}; domain=${domain}; path=/`;
            document.cookie = cookieValue;
        }

        // Store the number of chunks as a separate cookie
        const cookieValue = `${encodeURIComponent(name)}_chunks=${numChunks}; expires=${expiration.toUTCString()}; domain=${domain}; path=/`;
        document.cookie = cookieValue;
    };

    public triggerLogin = async (e: any) => {
        const router = useRouter();
        e.preventDefault(); // Prevent default form submission behavior
        const username: any = (document.getElementById("username") as HTMLInputElement).value;
        const password: any = (document.getElementById("password") as HTMLInputElement).value;
        const response: any = await client.query({
            query: GET_LOGIN,
            variables: {
                "username": username,
                "password": password
            }
        })
        const errorHandling = document.getElementById("ErrorHandling");
        if (username === "" || username === null) {
            errorHandling.innerHTML = "Input Username";
            (document.getElementById("username") as HTMLInputElement).focus();
        } else if (password === "" || password === null) {
            errorHandling.innerHTML = "Input Password";
            (document.getElementById("password") as HTMLInputElement).focus();
        } else {
            if (response.data.getLogin.statusText === "Welcome!") {
                this.setSharedCookie("token", response.data.getLogin.jsonToken, 1, 'localhost');
                router.push('/Management/Dashboard/');
            } else {
                errorHandling.innerHTML = "Input Password";
                (document.getElementById("password") as HTMLInputElement).focus();
            }
        }
    };

}
export default DataManager