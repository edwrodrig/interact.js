import extend from '@interactjs/utils/extend'
import rectUtils from '@interactjs/utils/rect'
import { ModifierArg, ModifierState } from '../base'
import restrictEdges, { RestrictEdgesState } from './edges'
import { RestrictOptions } from './pointer'

const noMin = { width: -Infinity, height: -Infinity }
const noMax = { width: +Infinity, height: +Infinity }

export interface RestrictSizeOptions {
  min?: Interact.Size | Interact.Point | RestrictOptions['restriction']
  max?: Interact.Size | Interact.Point | RestrictOptions['restriction']
  endOnly: boolean
}

function start (arg: ModifierArg<RestrictEdgesState>) {
  return restrictEdges.start(arg)
}

export type RestrictSizeState =
  RestrictEdgesState & ModifierState<RestrictSizeOptions & { inner: Interact.Rect, outer: Interact.Rect }, {
    min: Interact.Rect
    max: Interact.Rect
  }>

function set (arg: ModifierArg<RestrictSizeState>) {
  const { interaction, state } = arg
  const { options } = state
  const edges = interaction.prepared._linkedEdges || interaction.prepared.edges

  if (!edges) {
    return
  }

  const rect = rectUtils.xywhToTlbr(interaction.resizeRects.inverted)

  const minSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.min, interaction, arg.coords)) || noMin
  const maxSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.max, interaction, arg.coords)) || noMax

  state.options = {
    endOnly: options.endOnly,
    inner: extend({}, restrictEdges.noInner),
    outer: extend({}, restrictEdges.noOuter),
  }

  if (edges.top) {
    state.options.inner.top = rect.bottom - minSize.height
    state.options.outer.top = rect.bottom - maxSize.height
  }
  else if (edges.bottom) {
    state.options.inner.bottom = rect.top + minSize.height
    state.options.outer.bottom = rect.top + maxSize.height
  }
  if (edges.left) {
    state.options.inner.left = rect.right - minSize.width
    state.options.outer.left = rect.right - maxSize.width
  }
  else if (edges.right) {
    state.options.inner.right = rect.left + minSize.width
    state.options.outer.right = rect.left + maxSize.width
  }

  restrictEdges.set(arg)

  state.options = options
}

const defaults: RestrictSizeOptions = {
  min: null,
  max: null,
  endOnly: false,
}

const restrictSize = {
  start,
  set,
  defaults,
}

export default restrictSize
