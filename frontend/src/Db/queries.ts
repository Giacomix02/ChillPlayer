import {db, Playlist, Source} from "$/Db/db";
import {PromiseExtended} from "dexie";


//function for Playlist

export async function addPlaylist(name: string) {
    await db.Playlists.add({name})
}

export async function getAllPlaylists(): Promise<Array<Playlist>>{
    return db.Playlists.toArray();
}

export async function getPlaylistById(id: number): Promise<Playlist | undefined> {
    return db.Playlists.get(id);
}

export async function updatePlaylist(id: number, name: string) {
    await db.Playlists.update(id, {name});
}

export async function deletePlaylist(id: number) {
    const playlist = await db.Playlists.get(id);
    if (playlist) {
        await db.Playlists.delete(id);
        // Also delete any relations in PlaylistsWithSources
        await db.PlaylistsWithSources.where('idPlaylist').equals(id).delete();
    }
}


//function for Source

export async function addSource(path: string, type: 'video' | 'audio'): Promise<Source | false> {
    const existingSource = await db.Sources.where('path').equals(path).first();
    if(!existingSource) {
        await db.Sources.add({path, type, playTime: 0});
        return {
            id: await db.Sources.where('path').equals(path).first().then(source => source?.id || 0),
            path,
            type,
            playTime: 0
        }
    }else {
        return false
    }
}

export async function updateSourcePlayTimeById(id: number) {
    const source = await db.Sources.get(id);
    const playTime = source?.playTime || 0;
    await db.Sources.update(id, {playTime: playTime + 1});
}

export async function getAllSources(): Promise<Array<Source>> {
    return db.Sources.toArray();
}

export async function getSourcesByType(type: 'video' | 'audio'): Promise<Array<Source>> {
    return db.Sources.where('type').equals(type).toArray();
}

export async function getSourceById(id: number): Promise<Source | undefined> {
    return db.Sources.get(id);
}

export async function deleteSource(id: number) {
    const source = await db.Sources.get(id);
    if (source) {
        await db.Sources.delete(id);
        // Also delete any relations in PlaylistsWithSources
        await db.PlaylistsWithSources.where('idSource').equals(id).delete();
    }
}



//function for PlaylistWithSources ( Relation between Playlist and Source )

export async function addPlaylistSourceRelation (idPlaylist: number,idSource: number ) {
    const existingRelation = await db.PlaylistsWithSources
        .where({idPlaylist, idSource})
        .first();
    if (!existingRelation) {
        await db.PlaylistsWithSources.add({idPlaylist, idSource});
    }
}

export async function getSourcesByPlaylistId(idPlaylist: number): Promise<Array<Source>> {
    const relations = await db.PlaylistsWithSources.where('idPlaylist').equals(idPlaylist).toArray();
    const sourceIds = relations.map(relation => relation.idSource);
    return db.Sources.where('id').anyOf(sourceIds).toArray();
}

export async function deletePlaylistSourceRelation(idPlaylist: number, idSource: number) {
    await db.PlaylistsWithSources
        .where({idPlaylist, idSource})
        .delete();
}


