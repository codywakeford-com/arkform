import dayjs from "dayjs"

const $time = {
    now: () => Date.now(),
    server: async () => {
        const response = await $fetch<{ unixtime: number }>("https://worldtimeapi.org/api/timezone/Etc/UTC", {
            method: "get",
        })

        return response?.unixtime as number
    },
}

export const $second = 1000
export const $minute = 60000
export const $hour = 3600000
export const $day = 86400000
export const $week = 604800000
export const $month = 2419200000
export const $year = 29030400000
