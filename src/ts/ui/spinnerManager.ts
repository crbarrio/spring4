import { qs } from "../utils/dom";

export type SpinnerController = {
    start: () => void;
    stop: () => void;
    run: <T>(task: Promise<T>) => Promise<T>;
};

type SpinnerOptions = {
    delayMs?: number;
    hiddenClass?: string;
};

export function createSpinner(
    selector: string,
    { delayMs = 300, hiddenClass = "hidden" }: SpinnerOptions = {}
): SpinnerController {
    const el = qs<HTMLElement>(selector);
    if (!el) throw new Error(`Spinner element not found: ${selector}`);

    let pendingCount = 0;
    let showTimer: number | undefined;

    const show = () => el.classList.remove(hiddenClass);
    const hide = () => el.classList.add(hiddenClass);

    // Ensure a consistent initial state (hidden) even if the HTML doesn't include the class.
    hide();

    const start = () => {
        pendingCount += 1;

        if (pendingCount === 1) {
            if (showTimer) {
                clearTimeout(showTimer);
                showTimer = undefined;
            }

            showTimer = window.setTimeout(() => {
                showTimer = undefined;
                if (pendingCount > 0) show();
            }, delayMs);
        }
    };

    const stop = () => {
        if (pendingCount > 0) pendingCount -= 1;

        if (pendingCount === 0) {
            if (showTimer) {
                clearTimeout(showTimer);
                showTimer = undefined;
            }
            hide();
        }
    };

    const run = async <T>(task: Promise<T>): Promise<T> => {
        start();
        try {
            return await task;
        } finally {
            stop();
        }
    };

    return { start, stop, run };
}
