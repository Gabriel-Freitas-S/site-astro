type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

const defaultOptions: ObserverOptions = {
  threshold: 0.1,
  rootMargin: '50px',
  once: true
};

export class SharedObserver {
  private static instance: SharedObserver;
  private observer: IntersectionObserver;
  private observedElements: Map<Element, IntersectionCallback>;

  private constructor(options: ObserverOptions = defaultOptions) {
    this.observedElements = new Map();
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const callback = this.observedElements.get(entry.target);
          if (callback && entry.isIntersecting) {
            callback(entry);
            if (options.once) {
              this.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin
      }
    );
  }

  public static getInstance(options?: ObserverOptions): SharedObserver {
    if (!SharedObserver.instance) {
      SharedObserver.instance = new SharedObserver(options);
    }
    return SharedObserver.instance;
  }

  public observe(element: Element, callback: IntersectionCallback): void {
    if (!this.observedElements.has(element)) {
      this.observedElements.set(element, callback);
      this.observer.observe(element);
    }
  }

  public unobserve(element: Element): void {
    this.observedElements.delete(element);
    this.observer.unobserve(element);
  }

  public disconnect(): void {
    this.observedElements.clear();
    this.observer.disconnect();
  }
}