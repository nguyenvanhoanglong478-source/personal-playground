import { flushSync } from 'react-dom';

export type ViewTransitionKind = 'theme' | 'tab';

interface ViewTransitionHandle {
  finished: Promise<void>;
}

type DocumentWithVT = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionHandle;
};

export function runViewTransition(
  update: () => void,
  reducedMotion: boolean,
  kind: ViewTransitionKind
): void {
  if (typeof document === 'undefined' || reducedMotion) {
    update();
    return;
  }

  const doc = document as DocumentWithVT;
  if (typeof doc.startViewTransition !== 'function') {
    update();
    return;
  }

  const root = document.documentElement;
  root.dataset.vtKind = kind;
  try {
    const transition = doc.startViewTransition(() => {
      flushSync(update);
    });
    transition.finished
      .catch(() => undefined)
      .finally(() => {
        if (root.dataset.vtKind === kind) {
          delete root.dataset.vtKind;
        }
      });
  } catch {
    delete root.dataset.vtKind;
    update();
  }
}
