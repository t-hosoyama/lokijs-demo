import LokiJS from 'lokijs'

export default function loki(version: string) {
  return new Promise<LokiJS>((resolve, reject) => {
    const db = new LokiJS(`./databases/${version}.json`, {
      autosave: true,
      autoload: true,
      autoloadCallback: (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(db);
        }
      },
    });
  })
}
