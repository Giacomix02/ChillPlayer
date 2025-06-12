class Music{
    name: string
    path: string
    genre: string
    artist: string

    constructor(name: string, path: string, genere: string = '', artist: string = '' ) {
        this.name = name;
        this.path = path;
        this.genre = genere;
        this.artist = artist;
    }

    getTitle(): string {
        return this.name;
    }

    getPath(): string {
        return this.path;
    }

    getGenere(): string {
        return this.genre;
    }

    getArtist(): string {
        return this.artist;
    }
}