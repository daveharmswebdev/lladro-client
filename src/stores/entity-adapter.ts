/**
 * @file Generic entity adapter for state management, inspired by @ngrx/entity.
 * Provides a standardized way to interact with collections of entities.
 */

/**
 * The shape of the state for a collection of entities.
 * @template T The type of the entity.
 */
export interface EntityState<T> {
  ids: string[];
  entities: Record<string, T>;
}

/**
 * An entity must have a string `id` property.
 */
interface EntityWithId {
  id: string;
}

/**
 * Options for the entity adapter, such as a custom sort comparer.
 * @template T The type of the entity.
 */
export interface EntityAdapterOptions<T> {
  sortComparer?: (a: T, b: T) => number;
}

/**
 * The adapter provides methods to manipulate and query the entity state.
 * @template T The type of the entity.
 */
export interface EntityAdapter<T> {
  getInitialState(): EntityState<T>;
  getSelectors(): {
    selectAll: (state: EntityState<T>) => T[];
    selectById: (state: EntityState<T>, id: string) => T | undefined;
    selectIds: (state: EntityState<T>) => string[];
    selectTotal: (state: EntityState<T>) => number;
  };
  addOne<S extends EntityState<T>>(state: S, entity: T): S;
  addMany<S extends EntityState<T>>(state: S, entities: T[]): S;
  setAll<S extends EntityState<T>>(state: S, entities: T[]): S;
  setOne<S extends EntityState<T>>(state: S, entity: T): S;
  setMany<S extends EntityState<T>>(state: S, entities: T[]): S;
  removeOne<S extends EntityState<T>>(state: S, id: string): S;
  removeMany<S extends EntityState<T>>(state: S, ids: string[]): S;
  removeAll<S extends EntityState<T>>(state: S): S;
  updateOne<S extends EntityState<T>>(state: S, update: { id: string; changes: Partial<T> }): S;
  updateMany<S extends EntityState<T>>(state: S, updates: { id: string; changes: Partial<T> }[]): S;
  upsertOne<S extends EntityState<T>>(state: S, entity: T): S;
  upsertMany<S extends EntityState<T>>(state: S, entities: T[]): S;
}

/**
 * Creates a new entity adapter.
 * @template T The type of entity.
 * @param {EntityAdapterOptions<T>} [options={}] - Adapter options.
 * @returns {EntityAdapter<T>} A new entity adapter.
 */
export function createEntityAdapter<T extends EntityWithId>(
  options: EntityAdapterOptions<T> = {}
): EntityAdapter<T> {
  const { sortComparer } = options;

  const getInitialState = (): EntityState<T> => ({
    ids: [],
    entities: {},
  });

  const getSelectors = () => ({
    selectAll: (state: EntityState<T>): T[] => state.ids.map(id => state.entities[id]),
    selectById: (state: EntityState<T>, id: string): T | undefined => state.entities[id],
    selectIds: (state: EntityState<T>): string[] => state.ids,
    selectTotal: (state: EntityState<T>): number => state.ids.length,
  });

  const sortIds = (ids: string[], entities: Record<string, T>): void => {
    if (sortComparer) {
      ids.sort((a, b) => sortComparer(entities[a], entities[b]));
    }
  };

  const setAll = <S extends EntityState<T>>(state: S, entities: T[]): S => {
    const ids = entities.map(e => e.id);
    const newEntities = entities.reduce(
      (acc, entity) => {
        acc[entity.id] = entity;
        return acc;
      },
      {} as Record<string, T>
    );
    sortIds(ids, newEntities);
    return { ...state, ids, entities: newEntities };
  };

  const addOne = <S extends EntityState<T>>(state: S, entity: T): S => {
    if (state.entities[entity.id]) return state;
    const ids = [...state.ids, entity.id];
    const entities = { ...state.entities, [entity.id]: entity };
    sortIds(ids, entities);
    return { ...state, ids, entities };
  };

  const addMany = <S extends EntityState<T>>(state: S, entities: T[]): S => {
    const newEntities = entities.filter(e => !state.entities[e.id]);
    if (newEntities.length === 0) return state;
    const newIds = newEntities.map(e => e.id);
    const ids = [...state.ids, ...newIds];
    const updatedEntities = newEntities.reduce(
      (acc, entity) => {
        acc[entity.id] = entity;
        return acc;
      },
      { ...state.entities }
    );
    sortIds(ids, updatedEntities);
    return { ...state, ids, entities: updatedEntities };
  };

  const setOne = <S extends EntityState<T>>(state: S, entity: T): S => {
    const ids = state.entities[entity.id] ? state.ids : [...state.ids, entity.id];
    const entities = { ...state.entities, [entity.id]: entity };
    sortIds(ids, entities);
    return { ...state, ids, entities };
  };

  const setMany = <S extends EntityState<T>>(state: S, entities: T[]): S => {
    let newState = { ...state };
    for (const entity of entities) {
      newState = setOne(newState, entity);
    }
    return newState;
  };

  const removeOne = <S extends EntityState<T>>(state: S, id: string): S => {
    if (!state.entities[id]) return state;
    const { [id]: removed, ...entities } = state.entities;
    const ids = state.ids.filter(i => i !== id);
    return { ...state, ids, entities };
  };

  const removeMany = <S extends EntityState<T>>(state: S, idsToRemove: string[]): S => {
    const idSet = new Set(idsToRemove);
    const entities = { ...state.entities };
    const ids = state.ids.filter(id => {
      if (idSet.has(id)) {
        delete entities[id];
        return false;
      }
      return true;
    });
    return { ...state, ids, entities };
  };

  const removeAll = <S extends EntityState<T>>(state: S): S => {
    return { ...state, ...getInitialState() };
  };

  const updateOne = <S extends EntityState<T>>(
    state: S,
    update: { id: string; changes: Partial<T> }
  ): S => {
    const entity = state.entities[update.id];
    if (!entity) return state;
    const updatedEntity = { ...entity, ...update.changes };
    const entities = { ...state.entities, [update.id]: updatedEntity };
    const ids = [...state.ids];
    sortIds(ids, entities);
    return { ...state, ids, entities };
  };

  const updateMany = <S extends EntityState<T>>(
    state: S,
    updates: { id: string; changes: Partial<T> }[]
  ): S => {
    let newState = { ...state };
    for (const update of updates) {
      newState = updateOne(newState, update);
    }
    return newState;
  };

  return {
    getInitialState,
    getSelectors,
    setAll,
    addOne,
    addMany,
    setOne,
    setMany,
    removeOne,
    removeMany,
    removeAll,
    updateOne,
    updateMany,
    upsertOne: setOne, // upsertOne is an alias for setOne
    upsertMany: setMany, // upsertMany is an alias for setMany
  };
}
