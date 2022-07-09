

export const getDataFromApi = async (url) => {
    try {
        let data = await fetch(url)
        data = await data.json()
        return data.users

    } catch (e) {
        console.log("Fake url, I'm using moke")
        return []
    }
}