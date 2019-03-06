/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface FunnyChat {}
  interface FunnyChatAttributes extends StencilHTMLAttributes {}
}

declare global {
  interface StencilElementInterfaces {
    'FunnyChat': Components.FunnyChat;
  }

  interface StencilIntrinsicElements {
    'funny-chat': Components.FunnyChatAttributes;
  }


  interface HTMLFunnyChatElement extends Components.FunnyChat, HTMLStencilElement {}
  var HTMLFunnyChatElement: {
    prototype: HTMLFunnyChatElement;
    new (): HTMLFunnyChatElement;
  };

  interface HTMLElementTagNameMap {
    'funny-chat': HTMLFunnyChatElement
  }

  interface ElementTagNameMap {
    'funny-chat': HTMLFunnyChatElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
