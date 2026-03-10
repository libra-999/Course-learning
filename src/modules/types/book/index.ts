export interface Response<T> {
    kind?: string,
    totalItems: number,
    items : T[]
}
export interface VolumeInfo  {
    title: string,
    authors: string [] | null,
    publishedDate: string,
    industryIdentifiers: Industry [] | null,
    averageRating?: number,
    ratingsCount?: number,
    readingModes: {
        text: boolean,
        image: boolean
    },
    pageCount: number,  
    printType: printType,
    maturityRating: maturityRatingType,
    allowAnonLogging: boolean,
    contentVersion: string,  
    panelizationSummary: { 
        containsEpubBubbles: boolean,
        containsImageBubbles: boolean
    },
    imageLinks: {
        smallThumbnail?: string,
        thumbnail?: string
    },
    language: string,
    previewLink?: string ,
    infoLink?: string,
    canonicalVolumeLink?: string
    
}

export interface Industry {
    type: "OTHER" | "ISBN_10" | "ISBN_13",
    identifier: string
}

export interface Book {
    id: string,
    kind?: string,
    etag?: string,
    selfLink?: string,
    volumeInfo: VolumeInfo,
    saleInfo: {
        country: countryType,
        saleability?: saleabilityType,
        isEbook: boolean,
        buyLink: string
    },
    accessInfo: {
        country: countryType,
        viewability: viewabilityType,
        embeddable: boolean,
        publicDomain: boolean,
        textToSpeechPermission: textToSpeedPermissionType,
        epub: {
            isAvailable: boolean,
            downloadLink?: string
        },
        pdf: {
            isAvailable: boolean,
        },
        webReaderLink?: string,
        accessViewStatus: accessViewStatusType,
        quoteSharingAllowed: boolean
    },
    searchInfo?: {
        textSnippet: string
    } 
}

export type industryType = "OTHER" | "ISBN_10" | "ISBN_13"
export type printType = "ALL" | "BOOK" | "MAGAZINE"
export type maturityRatingType = "NOT_MATURE" | "MATURE"
export type countryType = "US" | "GB" | "CA" | "AU" | "DE" | "FR" | "IT" | "ES" | "JP" | "CN" | "IN" | "BR" | "RU" | "MX" | "KR" | "NL" | "SE" | "CH" | "BE" | "AT" | "DK" | "NO" | "FI" | "IE" | "NZ" | "KH"
export type saleabilityType = "FOR_SALE" | "FREE" | "NOT_FOR_SALE" | "FOR_PREORDER"
export type viewabilityType = "PARTIAL" | "ALL_PAGES" | "NO_PAGES" | "UNKNOWN"
export type textToSpeedPermissionType = "ALLOWED" | "ALLOWED_FOR_ACCESSIBILITY" | "NOT_ALLOWED" 
export type accessViewStatusType = "SAMPLE" | "FULL_PUBLIC_DOMAIN" | "FULL_RESTRICTED" | "NONE"

