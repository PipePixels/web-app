// "use client"
//
// import type React from "react"
// import { useState } from "react"
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Slider } from "@/components/ui/slider"
// import { Separator } from "@/components/ui/separator"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { useImages } from "./images-context"
// import { useCredits } from "./credits-context" // Import the useCredits hook
// import {
//   SunMedium,
//   Contrast,
//   Sun,
//   Sparkles,
//   CircleDashed,
//   Glasses,
//   Zap,
//   Waves,
//   Flower2,
//   Sparkle,
//   GrapeIcon as Grain,
//   FileImage,
//   Maximize,
//   RotateCw,
//   Move,
//   FlipHorizontal,
//   X,
//   ChevronDown,
//   ChevronUp,
//   Search,
//   Info,
//   CreditCard,
// } from "lucide-react"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
//
// // Define filter types
// type FilterType = {
//   id: string
//   name: string
//   icon: React.ReactNode
//   category: string
//   description: string
//   creditCost: number
//   params?: {
//     [key: string]: number
//   }
// }
//
// // Available filters with their default parameters
// const availableFiltersData: FilterType[] = [
//   // Tone filters
//   {
//     id: "brightness",
//     name: "Brightness",
//     icon: <SunMedium />,
//     category: "tone",
//     description:
//       "Adjusts the overall lightness or darkness of the image. Higher values make the image brighter, lower values make it darker.",
//     creditCost: 1,
//     params: { value: 100 },
//   },
//   {
//     id: "contrast",
//     name: "Contrast",
//     icon: <Contrast />,
//     category: "tone",
//     description:
//       "Increases or decreases the difference between light and dark areas. Higher values increase contrast, lower values decrease it.",
//     creditCost: 1,
//     params: { value: 100 },
//   },
//   {
//     id: "exposure",
//     name: "Exposure",
//     icon: <Sun />,
//     category: "tone",
//     description:
//       "Controls the amount of light in the image. Similar to brightness but affects highlights more dramatically.",
//     creditCost: 1,
//     params: { value: 0 },
//   },
//   {
//     id: "highlights",
//     name: "Highlights",
//     icon: <Sparkles />,
//     category: "tone",
//     description: "Adjusts the brightness of the brightest parts of the image without affecting shadows.",
//     creditCost: 1,
//     params: { value: 0 },
//   },
//
//   // Detail filters
//   {
//     id: "blur",
//     name: "Blur",
//     icon: <CircleDashed />,
//     category: "detail",
//     description: "Softens the image by reducing detail and creating a hazy effect. Higher values create more blur.",
//     creditCost: 1,
//     params: { radius: 0 },
//   },
//   {
//     id: "clarity",
//     name: "Clarity",
//     icon: <Glasses />,
//     category: "detail",
//     description:
//       "Enhances the definition of edges in the image. Increases local contrast while maintaining overall contrast.",
//     creditCost: 2,
//     params: { value: 0 },
//   },
//   {
//     id: "sharpen",
//     name: "Sharpen",
//     icon: <Zap />,
//     category: "detail",
//     description: "Increases the definition of edges to make the image appear more defined and crisp.",
//     creditCost: 2,
//     params: { value: 0 },
//   },
//   {
//     id: "smooth",
//     name: "Smooth",
//     icon: <Waves />,
//     category: "detail",
//     description: "Reduces noise and small details while preserving edges, creating a smoother appearance.",
//     creditCost: 2,
//     params: { value: 0 },
//   },
//
//   // Effect filters
//   {
//     id: "bloom",
//     name: "Bloom",
//     icon: <Flower2 />,
//     category: "effect",
//     description:
//       "Creates a soft glow around bright areas of the image, similar to the effect seen in dreamy photography.",
//     creditCost: 3,
//     params: { intensity: 0 },
//   },
//   {
//     id: "glamour",
//     name: "Glamour",
//     icon: <Sparkle />,
//     category: "effect",
//     description: "Softens skin tones and adds a subtle glow, commonly used in portrait photography.",
//     creditCost: 3,
//     params: { value: 0 },
//   },
//   {
//     id: "grain",
//     name: "Grain",
//     icon: <Grain />,
//     category: "effect",
//     description: "Adds film-like grain texture to the image, creating a vintage or analog appearance.",
//     creditCost: 2,
//     params: { amount: 0 },
//   },
//   {
//     id: "monochrome",
//     name: "Monochrome",
//     icon: <FileImage />,
//     category: "effect",
//     description: "Converts the image to black and white while maintaining contrast and detail.",
//     creditCost: 1,
//   },
//
//   // Transform filters
//   {
//     id: "scale",
//     name: "Scale",
//     icon: <Maximize />,
//     category: "transform",
//     description:
//       "Resizes the image while maintaining its aspect ratio. Values above 100 enlarge, below 100 reduce size.",
//     creditCost: 1,
//     params: { value: 100 },
//   },
//   {
//     id: "rotate",
//     name: "Rotate",
//     icon: <RotateCw />,
//     category: "transform",
//     description: "Rotates the image by the specified angle in degrees. Positive values rotate clockwise.",
//     creditCost: 1,
//     params: { angle: 0 },
//   },
//   {
//     id: "translate",
//     name: "Translate",
//     icon: <Move />,
//     category: "transform",
//     description: "Moves the image horizontally (x) and vertically (y) within its frame.",
//     creditCost: 1,
//     params: { x: 0, y: 0 },
//   },
//   {
//     id: "mirror",
//     name: "Mirror",
//     icon: <FlipHorizontal />,
//     category: "transform",
//     description: "Flips the image horizontally, creating a mirror reflection of the original.",
//     creditCost: 1,
//   },
// ]
//
// // Category display names and order
// const categories = [
//   { id: "tone", name: "Tone Adjustments" },
//   { id: "detail", name: "Detail Enhancement" },
//   { id: "effect", name: "Effects" },
//   { id: "transform", name: "Transformations" },
// ]
//
// export default function Sidebar() {
//   const { hasImages, processAllImages } = useImages()
//   const { credits, deductCredits } = useCredits() // Use the hook at the top level
//   const [availableFilters] = useState<FilterType[]>(availableFiltersData)
//   const [queuedFilters, setQueuedFilters] = useState<FilterType[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({})
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [applyingCredits, setApplyingCredits] = useState(false)
//
//   // Calculate total credits required for queued filters
//   const totalCreditsRequired = queuedFilters.reduce((total, filter) => {
//     const originalFilter = availableFiltersData.find((f) => f.id === filter.id.split("-")[0])
//     return total + (originalFilter?.creditCost || 1)
//   }, 0)
//
//   // Handle applying filters to all images
//   const handleApplyFilters = async () => {
//     if (!hasImages || queuedFilters.length === 0 || credits < totalCreditsRequired) return
//
//     setIsProcessing(true)
//     setApplyingCredits(true)
//     try {
//       await processAllImages(queuedFilters)
//       // Deduct credits after successful processing
//       deductCredits(totalCreditsRequired)
//       // Success notification could be added here
//     } catch (error) {
//       console.error("Error processing images:", error)
//       // Error notification could be added here
//     } finally {
//       setIsProcessing(false)
//       setApplyingCredits(false)
//     }
//   }
//
//   // Handle drag and drop between lists
//   const onDragEnd = (result: any) => {
//     const { source, destination } = result
//
//     // Dropped outside the list
//     if (!destination) {
//       return
//     }
//
//     // Moving within the same list
//     if (source.droppableId === destination.droppableId) {
//       if (source.droppableId === "queuedFilters") {
//         const newQueuedFilters = Array.from(queuedFilters)
//         const [movedItem] = newQueuedFilters.splice(source.index, 1)
//         newQueuedFilters.splice(destination.index, 0, movedItem)
//         setQueuedFilters(newQueuedFilters)
//       }
//     } else {
//       // Moving from available to queued
//       if (source.droppableId === "availableFilters" && destination.droppableId === "queuedFilters") {
//         // Get the filter from the filtered list
//         const filteredFilters = getFilteredFilters()
//         const sourceFilter = filteredFilters[source.index]
//
//         // Create a copy with a unique ID to allow multiple instances of the same filter
//         const newFilter = {
//           ...sourceFilter,
//           id: `${sourceFilter.id}-${Date.now()}`,
//         }
//         const newQueuedFilters = Array.from(queuedFilters)
//         newQueuedFilters.splice(destination.index, 0, newFilter)
//         setQueuedFilters(newQueuedFilters)
//
//         // Set the new filter to be open by default
//         setOpenFilters((prev) => ({
//           ...prev,
//           [newFilter.id]: true,
//         }))
//       }
//     }
//   }
//
//   // Toggle the collapsed state of a filter
//   const toggleFilterCollapse = (filterId: string) => {
//     setOpenFilters((prev) => ({
//       ...prev,
//       [filterId]: !prev[filterId],
//     }))
//   }
//
//   // Remove a filter from the queue
//   const removeFilter = (index: number) => {
//     const filterId = queuedFilters[index].id
//     const newQueuedFilters = [...queuedFilters]
//     newQueuedFilters.splice(index, 1)
//     setQueuedFilters(newQueuedFilters)
//
//     // Remove the filter from openFilters state
//     const newOpenFilters = { ...openFilters }
//     delete newOpenFilters[filterId]
//     setOpenFilters(newOpenFilters)
//   }
//
//   // Update filter parameters
//   const updateFilterParam = (index: number, paramName: string, value: number) => {
//     const newQueuedFilters = [...queuedFilters]
//     if (newQueuedFilters[index].params) {
//       newQueuedFilters[index].params![paramName] = value
//       setQueuedFilters(newQueuedFilters)
//     }
//   }
//
//   // Filter available filters based on search query
//   const getFilteredFilters = () => {
//     if (searchQuery === "") {
//       return availableFilters
//     }
//
//     return availableFilters.filter((filter) => filter.name.toLowerCase().includes(searchQuery.toLowerCase()))
//   }
//
//   // Group filters by category
//   const getFiltersByCategory = () => {
//     const filteredFilters = getFilteredFilters()
//
//     if (filteredFilters.length === 0) {
//       return []
//     }
//
//     return categories
//       .map((category) => {
//         const filters = filteredFilters.filter((filter) => filter.category === category.id)
//         return {
//           ...category,
//           filters,
//         }
//       })
//       .filter((category) => category.filters.length > 0)
//   }
//
//   const filteredCategories = getFiltersByCategory()
//
//   return (
//     <div className="w-full md:w-80 flex-shrink-0">
//       <DragDropContext onDragEnd={onDragEnd}>
//         {/* Credit Information */}
//         <Card className="mb-6">
//           <CardHeader className="pb-3">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-lg font-medium">Credits</CardTitle>
//               <Badge variant="outline" className="px-2 py-1">
//                 <CreditCard className="h-3.5 w-3.5 mr-1" />
//                 {credits} available
//               </Badge>
//             </div>
//             <CardDescription>Each filter operation consumes credits</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-sm font-medium">Required for current filters:</p>
//                 <p className="text-xs text-muted-foreground">
//                   {queuedFilters.length} filters ×{" "}
//                   {queuedFilters.length > 0 ? Math.round((totalCreditsRequired / queuedFilters.length) * 10) / 10 : 0}{" "}
//                   avg. cost
//                 </p>
//               </div>
//               <Badge variant={credits >= totalCreditsRequired ? "default" : "destructive"} className="text-sm">
//                 {totalCreditsRequired} credits
//               </Badge>
//             </div>
//             {credits < totalCreditsRequired && (
//               <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
//                 <p className="text-xs text-destructive flex items-center">
//                   <Info className="w-3.5 h-3.5 mr-1.5" />
//                   You need {totalCreditsRequired - credits} more credits to apply these filters
//                 </p>
//               </div>
//             )}
//             {queuedFilters.length > 0 && credits >= totalCreditsRequired && (
//               <div className="mt-3 p-2 bg-primary/10 border border-primary/20 rounded-md">
//                 <p className="text-xs text-primary flex items-center">
//                   <Info className="w-3.5 h-3.5 mr-1.5" />
//                   You have enough credits to apply these filters
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//
//         {/* Queued Filters Section */}
//         <Card className="mb-6">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-lg font-medium">Queued Filters</CardTitle>
//             <CardDescription>
//               {hasImages ? "Drag filters here to apply them in sequence" : "Upload images first to enable filters"}
//             </CardDescription>
//             {!hasImages && (
//               <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
//                 <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                     className="w-4 h-4 mr-2"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Please upload images before applying filters
//                 </p>
//               </div>
//             )}
//
//             <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
//               <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
//                 <Info className="w-4 h-4 mr-2" />
//                 Filters will be applied to all images
//               </p>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <Droppable droppableId="queuedFilters" isDropDisabled={!hasImages}>
//               {(provided) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className={`min-h-[120px] space-y-3 rounded-md border border-dashed p-4 ${!hasImages ? "opacity-60 bg-muted/30" : ""}`}
//                 >
//                   {queuedFilters.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-20 text-muted-foreground">
//                       <p className="text-sm">{hasImages ? "No filters queued" : "Filters disabled"}</p>
//                       <p className="text-xs">
//                         {hasImages ? "Drag filters from below to add them" : "Upload images to enable filters"}
//                       </p>
//                     </div>
//                   ) : (
//                     queuedFilters.map((filter, index) => {
//                       // Find the original filter to get its credit cost
//                       const originalFilter = availableFiltersData.find((f) => f.id === filter.id.split("-")[0])
//                       const creditCost = originalFilter?.creditCost || 1
//
//                       return (
//                         <Draggable key={filter.id} draggableId={filter.id} index={index} isDragDisabled={!hasImages}>
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className={`bg-card rounded-lg border shadow-sm ${!hasImages ? "opacity-60" : ""}`}
//                             >
//                               <Collapsible
//                                 open={openFilters[filter.id]}
//                                 onOpenChange={() => toggleFilterCollapse(filter.id)}
//                                 className="w-full"
//                               >
//                                 <div className="p-3 flex justify-between items-center">
//                                   <div className="flex items-center gap-2">
//                                     <div className="bg-primary/10 p-1.5 rounded-md text-primary">{filter.icon}</div>
//                                     <span className="font-medium">{filter.name}</span>
//                                     <Badge variant="outline" className="ml-1 text-xs">
//                                       {creditCost} credit{creditCost > 1 ? "s" : ""}
//                                     </Badge>
//                                   </div>
//                                   <div className="flex items-center">
//                                     <CollapsibleTrigger asChild>
//                                       <Button variant="ghost" size="icon" className="h-7 w-7 mr-1">
//                                         {openFilters[filter.id] ? (
//                                           <ChevronUp className="h-4 w-4" />
//                                         ) : (
//                                           <ChevronDown className="h-4 w-4" />
//                                         )}
//                                       </Button>
//                                     </CollapsibleTrigger>
//                                     <Button
//                                       variant="ghost"
//                                       size="icon"
//                                       className="h-7 w-7"
//                                       onClick={() => removeFilter(index)}
//                                     >
//                                       <X className="h-4 w-4" />
//                                     </Button>
//                                   </div>
//                                 </div>
//
//                                 <CollapsibleContent className="px-3 pb-3">
//                                   {filter.params &&
//                                     Object.entries(filter.params).map(([param, value]) => (
//                                       <div key={param} className="mt-3">
//                                         <div className="flex justify-between text-xs mb-1.5">
//                                           <span className="capitalize text-muted-foreground">{param}</span>
//                                           <Badge variant="outline" className="h-5 px-2 font-normal">
//                                             {value}
//                                           </Badge>
//                                         </div>
//                                         <Slider
//                                           value={[value]}
//                                           min={param === "angle" ? -180 : -100}
//                                           max={param === "angle" ? 180 : 200}
//                                           step={1}
//                                           onValueChange={(values) => updateFilterParam(index, param, values[0])}
//                                           className="my-0.5"
//                                         />
//                                       </div>
//                                     ))}
//                                 </CollapsibleContent>
//                               </Collapsible>
//                             </div>
//                           )}
//                         </Draggable>
//                       )
//                     })
//                   )}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//
//             {queuedFilters.length > 0 && (
//               <div className="mt-4 flex justify-between">
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={() => {
//                     // Toggle all filters to be either all open or all closed
//                     const allOpen = queuedFilters.every((filter) => openFilters[filter.id])
//                     const newState = !allOpen
//
//                     const newOpenFilters = {}
//                     queuedFilters.forEach((filter) => {
//                       newOpenFilters[filter.id] = newState
//                     })
//
//                     setOpenFilters(newOpenFilters)
//                   }}
//                 >
//                   {queuedFilters.every((filter) => openFilters[filter.id]) ? "Collapse All" : "Expand All"}
//                 </Button>
//                 <Button size="sm" onClick={() => setQueuedFilters([])}>
//                   Clear All
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//           {queuedFilters.length > 0 && hasImages && (
//             <CardFooter className="pt-0">
//               <Button
//                 className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
//                 onClick={handleApplyFilters}
//                 disabled={isProcessing || credits < totalCreditsRequired}
//               >
//                 {isProcessing ? (
//                   <>
//                     <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
//                     Processing...
//                   </>
//                 ) : credits < totalCreditsRequired ? (
//                   <>Not Enough Credits</>
//                 ) : (
//                   <>Apply Filters to All Images</>
//                 )}
//               </Button>
//             </CardFooter>
//           )}
//         </Card>
//
//         <Separator className="my-6" />
//
//         {/* Available Filters Section */}
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-lg font-medium">Available Filters</CardTitle>
//             <CardDescription>
//               {hasImages ? "Drag these filters to the queue above" : "Upload images to enable filters"}
//             </CardDescription>
//
//             <div className="relative mt-2">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search filters..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-8"
//                 disabled={!hasImages}
//               />
//             </div>
//           </CardHeader>
//           <CardContent className="p-0">
//             <Droppable droppableId="availableFilters" isDropDisabled={!hasImages}>
//               {(provided) => (
//                 <div
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                   className={`max-h-[400px] overflow-y-auto pr-1.5 pl-3 pb-3 ${!hasImages ? "opacity-60" : ""}`}
//                 >
//                   {filteredCategories.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center h-20 text-muted-foreground p-4">
//                       <p className="text-sm">No filters match your search</p>
//                     </div>
//                   ) : (
//                     filteredCategories.map((category, categoryIndex) => (
//                       <div key={category.id} className={categoryIndex > 0 ? "mt-6" : "mt-3"}>
//                         <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
//                           {category.name}
//                         </h3>
//                         <div className="space-y-2">
//                           {category.filters.map((filter, index) => (
//                             <Draggable
//                               key={filter.id}
//                               draggableId={filter.id}
//                               index={availableFilters.findIndex((f) => f.id === filter.id)}
//                               isDragDisabled={!hasImages}
//                             >
//                               {(provided) => (
//                                 <div
//                                   ref={provided.innerRef}
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   className={`bg-card border rounded-md p-3 flex items-center gap-3 ${
//                                     hasImages ? "cursor-grab hover:bg-accent/50" : "cursor-not-allowed"
//                                   } transition-colors`}
//                                 >
//                                   <div
//                                     className={`p-1.5 rounded-md ${hasImages ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
//                                   >
//                                     {filter.icon}
//                                   </div>
//                                   <div className="flex-1 min-w-0">
//                                     <div className="flex items-center">
//                                       <span className="text-sm font-medium">{filter.name}</span>
//                                       <Badge variant="outline" className="ml-2 text-xs">
//                                         {filter.creditCost} credit{filter.creditCost > 1 ? "s" : ""}
//                                       </Badge>
//                                     </div>
//                                   </div>
//
//                                   <TooltipProvider>
//                                     <Tooltip>
//                                       <TooltipTrigger asChild>
//                                         <Info className="h-4 w-4 text-muted-foreground" />
//                                       </TooltipTrigger>
//                                       <TooltipContent className="bg-popover text-popover-foreground border-border max-w-xs">
//                                         <div className="space-y-2">
//                                           <p>{filter.description}</p>
//                                           <div className="text-xs text-muted-foreground pt-1 border-t">
//                                             Cost: {filter.creditCost} credit{filter.creditCost > 1 ? "s" : ""} per
//                                             operation
//                                           </div>
//                                         </div>
//                                       </TooltipContent>
//                                     </Tooltip>
//                                   </TooltipProvider>
//                                 </div>
//                               )}
//                             </Draggable>
//                           ))}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           </CardContent>
//         </Card>
//       </DragDropContext>
//     </div>
//   )
// }
