'use client';

import { useEffect, useRef, useState, Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { VideoPlayerProps } from '../types/video';

export default function VideoPlayer({ video, isOpen, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [maxHeight, setMaxHeight] = useState('70vh');

  useEffect(() => {
    const updateMaxHeight = () => {
      const height = window.innerHeight;
      setMaxHeight(`${Math.min(height * 0.7, 800)}px`);
    };

    updateMaxHeight();
    window.addEventListener('resize', updateMaxHeight);

    return () => window.removeEventListener('resize', updateMaxHeight);
  }, []);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isOpen, video]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel 
                className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-gray-900 text-left align-middle shadow-xl transition-all"
                style={{ maxHeight }}
              >
                <div className="relative">
                  <button
                    type="button"
                    className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-red-500 hover:bg-black/20 transition-colors z-10"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="overflow-hidden rounded-t-2xl">
                    <video
                      ref={videoRef}
                      src={video?.videoUrl}
                      controls
                      autoPlay
                      className="w-full h-auto object-contain bg-black"
                      style={{ maxHeight: 'calc(70vh - 120px)' }}
                    />
                  </div>
                  
                  <div className="p-6 bg-gray-900">
                    <DialogTitle
                      as="h3"
                      className="text-2xl font-bold leading-6 text-white mb-4"
                    >
                      {video?.title}
                    </DialogTitle>
                    <div className="flex flex-wrap gap-2">
                      {video?.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}