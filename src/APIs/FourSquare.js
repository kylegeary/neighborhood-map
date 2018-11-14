
// fetch venue ID
export const getFourSquareVenueID = (lat, lng, name) => {
	return fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&client_id=YJLQ001IOFDL3GA0OY1NSJPOY4QTZHHL4E2BU3P1VOW1ERG2&client_secret=NPH350MPAD5K3XBFR4EGLIZDT41O4RTOS5FPICW4HUJY2IL2&v=20180323&limit=1&query=${name}`)
		.then((res) => res.json())
    // API Quota exceeded - commenting out due to 429 return
    // .then((res) => res.response.venues[0].id);
}

// fetch venue data wih the venue ID
export const getFourSquareVenueInfo = (venueId) => {
	return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=YJLQ001IOFDL3GA0OY1NSJPOY4QTZHHL4E2BU3P1VOW1ERG2&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323`)
		.then((response) => response.json())
		.then((response) => response.response.venue);
}
