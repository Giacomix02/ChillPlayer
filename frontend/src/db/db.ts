import Dexie, { type EntityTable } from 'dexie';

interface Playlist {
    id: number;
    name: string;
}

interface Source {
    id: number;
    path: string;
    playTime: number; // how many times the source has been played
    type: 'video' | 'audio';
}

interface PlaylistWithSources{
    idPlaylist: number;
    idSource: number;
}



const db = new Dexie('PlayerDatabase') as Dexie & {
    Playlists: EntityTable<
        Playlist,
        'id'
    >;
    Sources: EntityTable<
        Source,
        'id'
    >;
    PlaylistsWithSources: EntityTable<
        PlaylistWithSources
    >;
};

// Schema declaration:
db.version(1).stores({
    Playlists: '++id, name',
    Sources: '++id, &path, type, playTime',
    PlaylistsWithSources: 'idPlaylist, idSource'
});

export type { Playlist };
export type { Source };
export { db };