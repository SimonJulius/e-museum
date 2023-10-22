export interface CollectionObject {
    links: {
        self: string
        web: string
    },
    id: string
    objectNumber: string
    title: string
    hasImage: boolean
    principalOrFirstMaker: string
    longTitle: string
    showImage: boolean
    permitDownload: boolean
    webImage: {
        guid: string
        offsetPercentageX: number
        offsetPercentageY: number
        width: number
        height: number
        url: string
    },
    headerImage: {
        guid: string
        offsetPercentageX: number
        offsetPercentageY: number
        width: number
        height: number
        url: number
    },
    productionPlaces: string | string[]
}
export interface ArtCollection {
    artObjects: CollectionObject[],
    count: number,
    countFacets: {
        hasimage: number
        ondisplay: number
    }
}


export interface ArtDetail {
    artObject: {
        id: string
        priref: string
        objectNumber: string
        language: string
        title: string
        copyrightHolder: string
        webImage: {
            guid: string
            offsetPercentageX: number
            offsetPercentageY: number
            width: number
            height: number
            url: string
        },
        colors: string[]
        colorsWithNormalization: string[]
        normalizedColors: string[]
        normalized32Colors: string[]
        materialsThesaurus: string[]
        techniquesThesaurus: string[]
        productionPlacesThesaurus: string[]
        titles: string[]
        description: string
        labelText: string
        objectTypes: string[]
        objectCollection: string[]
        makers: string[]
        principalMakers: [
            {
                name: string
                unFixedName: string
                placeOfBirth: string
                dateOfBirth: string
                dateOfBirthPrecision: string
                dateOfDeath: string
                dateOfDeathPrecision: string
                placeOfDeath: string
                occupation: string[]
                roles: string[]
                nationality: string
                biography: string
                productionPlaces: string[]
                qualification: string
                labelDesc: string
            }
        ],
        plaqueDescriptionDutch: string
        plaqueDescriptionEnglish: string
        principalMaker: string
        artistRole: string
        associations: string[]
        acquisition: {
            method: string
            date: string
            creditLine: string
        },
        exhibitions: string[]
        materials: string[]
        techniques: string[]
        productionPlaces: string[]
        dating: {
            presentingDate: string
            sortingDate: number
            period: number
            yearEarly: number
            yearLate: number
        },
        classification: {
            iconClassIdentifier: string[]
            iconClassDescription: string[]
            motifs: string[]
            events: string[]
            periods: string[]
            places: string[]
            people: string[]
            objectNumbers: string[]
        },
        hasImage: boolean
        historicalPersons: string[]
        inscriptions: string[]
        documentation: string[]
        catRefRPK: string[]
        principalOrFirstMaker: string
        dimensions: [
            {
                unit: string,
                type: string,
                precision: number
                part: number
                value: string
            },
            {
                unit: string
                type: string
                precision: string
                part: string
                value: string
            }
        ],
        physicalProperties: string[]
        physicalMedium: string
        longTitle: string
        subTitle: string
        scLabelLine: string
        label: {
            title: string
            makerLine: string
            description: string
            notes: string
            date: string
        },
        showImage: boolean
        location: string
    }
}

export interface ArtCollectionQueryParams {
    p: number
    ps: number
    q?: string
    type?: string
    imgonly?: boolean
}