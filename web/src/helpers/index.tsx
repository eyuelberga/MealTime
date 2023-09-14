import { endOfWeek, startOfWeek } from "date-fns";
import { FieldError } from "react-hook-form";

export function getFormErrorMessage(error: FieldError | undefined | any) {
    if (error && typeof error.message === "string")
        return error.message;
    return undefined;

}

export const wait = (ms = 3000) => { return new Promise((res) => setTimeout(() => res("wait"), ms)) };

export const isClient = () => (typeof window === 'undefined') ? false : true;

export function formatTimestamp(timestamp: string) {
    return new Date(timestamp).toLocaleString()
}


export function createLookup(list: any[], key: string) {
    const lookup: Record<string, any> = {};
    list.forEach((obj) => {
        const keyVal: string = obj[key];
        if (lookup[keyVal] && lookup[keyVal].length) {
            lookup[keyVal].push(obj);
        } else {
            lookup[keyVal] = [obj];
        }
    });
    return lookup;
}


export function getPaginationRange(c: number, m: number) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 0; i <= last; i++) {
        if (i == 0 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }
    return rangeWithDots;
}

export function imgUrl(image: string) {
    return `/api/files/${image}`;
}

export function timeOfDayWelcome() {
    const hour = new Date().getHours();
    const welcomeTypes = ['Good morning', 'Good afternoon', 'Good evening'];
    let index = 2;
    if (hour < 12) index = 0;
    else if (hour < 18) index = 1;
    return welcomeTypes[index];
};




export async function toDataURL(url: string) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    });
};


export function dataURLtoFile(dataurl: string, filename: string = Math.random().toString(36).slice(2)) {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}


export async function imgUrlToFile(url: string) {
    const filename = Math.random().toString(36).slice(2);
    const dataUrl = await toDataURL(url);
    if (typeof dataUrl === "string")
        return [dataURLtoFile(dataUrl, filename)];
    throw Error("Failed to convert Url to File object");
}


export const getViewDateRange = (date: Date, view: string) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const prevMonth = startOfWeek(date).getDate() > endOfWeek(date).getDate() ? monthNames[startOfWeek(date).getMonth() - 1]?.substring(0, 3) : "";
    const day = date.getDate();
    const weekStartDay = startOfWeek(date).getDate();
    const weekEndDay = endOfWeek(date).getDate();
    const month = monthNames[date.getMonth()]?.substring(0, 3);
    const year = date.getFullYear();
    return `${view === "day" ? day : ""} ${view === "week" ? `${weekStartDay} ${prevMonth} -  ${weekEndDay}` : ""} ${month}, ${year}`.trim();
}
