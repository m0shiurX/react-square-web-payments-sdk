// Dependencies
import { useState, useRef, useMemo, useEffect, JSX } from 'react';
import type * as Square from '@square/web-sdk';

// Internals
import { useForm } from '~/contexts/form';
import { useEventListener } from '~/hooks/use-event-listener';
import { LoadingCard, PayButton } from './gift-card.styles';
import type {
  GiftCardBase,
  GiftCardFunctionChildren,
  GiftCardPayButtonProps,
  GiftCardProps,
  GiftCardWithChildren,
} from './gift-card.types';
import React from 'react';

/**
 * Renders a Gift Card Input to use in the Square Web Payment SDK, pre-styled to
 * meet Square branding guidelines.
 *
 * **_But with the option to override styles_**
 *
 * @example
 *
 * ```tsx
 * function App() {
 *   return (
 *     <SquareForm {...props}>
 *       <GiftCard />
 *     </SquareForm>
 *   );
 * }
 * ```
 */
function GiftCard(props: GiftCardBase): JSX.Element;
function GiftCard(props: GiftCardFunctionChildren): JSX.Element;
function GiftCard(props: GiftCardWithChildren): JSX.Element;
function GiftCard({
  buttonProps = {
    id: 'rswps-gift-card-button',
  },
  callbacks,
  children,
  focus,
  id = 'rswps-gift-card-container',
  includeInputLabels,
  render,
  style,
  ...props
}: GiftCardProps) {
  const [giftCard, setGiftCard] = useState<Square.GiftCard | undefined>(() => undefined);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { cardTokenizeResponseReceived, payments } = useForm();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const options: Square.GiftCardOptions = useMemo(() => {
    const baseOptions = {
      includeInputLabels,
      style,
    };

    // if a value from options is undefined delete it from the options object
    return Object.keys(baseOptions).reduce((acc: Record<string, unknown>, key) => {
      if (baseOptions[key as keyof typeof baseOptions] !== undefined) {
        acc[key as string] = baseOptions[key as keyof typeof baseOptions];
      }

      return acc;
    }, {});
  }, [includeInputLabels, style]);

  /** Tokenizes a GiftCard payment method instance. */
  const handlePayment = async (e: Event) => {
    e.stopPropagation();

    if (!giftCard) {
      console.warn('Gift Card button was clicked, but no Gift Card instance was found.');

      return;
    }

    setIsSubmitting(true);

    try {
      const result = await giftCard?.tokenize();

      if (result.status === 'OK') {
        const tokenizedResult = await cardTokenizeResponseReceived(result);
        return tokenizedResult;
      }

      let message = `Tokenization failed with status: ${result.status}`;
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`;

        throw new Error(message);
      }

      console.warn(message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const start = async (signal: AbortSignal) => {
      const giftCard = await payments?.giftCard(options).then((res) => {
        if (!signal.aborted) {
          setGiftCard(res);

          return res;
        }

        return null;
      });

      await giftCard?.attach(`#${id}`);
      if (focus) {
        await giftCard?.focus(focus);
      }

      if (signal.aborted) {
        await giftCard?.destroy();
      }
    };

    start(signal);

    return () => {
      abortController.abort();
    };
  }, [payments, id]);

  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      giftCard?.addEventListener(
        callback as Square.GiftCardInputEventTypes,
        (callbacks as Record<string, (event: Square.SqEvent<Square.GiftCardInputEvent>) => void>)[callback]
      );
    }
  }

  useEventListener({
    listener: handlePayment,
    type: 'click',
    element: buttonRef.current,
    options: {
      passive: true,
    },
  });

  const Button = ({ isLoading, ...props }: GiftCardPayButtonProps) => {
    const id = 'rswp-gift-card-button';
    const disabled = isLoading || !giftCard || isSubmitting;

    return (
      <PayButton
        {...props}
        aria-disabled={disabled}
        css={props?.css}
        disabled={disabled}
        id={id}
        ref={buttonRef}
        type="button"
      >
        {props?.children ?? 'Pay with Gift Card'}
      </PayButton>
    );
  };

  return (
    <>
      <div {...props} data-testid="rswps-gift-card-container" id={id} style={{ minHeight: 89 }}>
        {!giftCard && <LoadingCard />}
      </div>

      {typeof render === 'function' ? (
        render(Button)
      ) : (
        <Button {...buttonProps}>{children ?? 'Pay with Gift Card'}</Button>
      )}
    </>
  );
}

export default GiftCard;
export * from './gift-card.types';
