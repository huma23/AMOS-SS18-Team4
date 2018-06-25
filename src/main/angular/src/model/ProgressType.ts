export enum ProgressType{
  Aktiv = 'Aktiv',
  Inaktiv = 'Inaktiv',
  Fertiggestellt = 'Fertiggestellt'
}

export namespace ProgressType {
  export function values() {
    return Object.keys(ProgressType).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
