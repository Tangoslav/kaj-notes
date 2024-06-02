import React, { useState, useEffect, useRef } from 'react';
import { createNote } from '../../utils/noteUtils';
import { playSound } from '../../utils/soundUtils';
import newNoteSound from '../../assets/sounds/newNoteSound.wav';
import { getCityFromCoordinates } from '../../utils/geocodingUtils'; // Import the utility function

const NewNoteForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [error, setError] = useState('');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                  const { latitude, longitude } = position.coords;
                  const locationString = await getCityFromCoordinates(latitude, longitude);
                  localStorage.setItem('userLocation', locationString);
              },
              (error) => {
                  console.error('Error fetching location:', error);
                  localStorage.setItem(
                    'userLocation',
                    'Location access denied.'
                  );
              }
            );
        } else {
            localStorage.setItem(
              'userLocation',
              'Geolocation is not supported by this browser.'
            );
        }
    };

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }

        if (isOnline) {
            fetchLocation();
        } else {
            localStorage.setItem('userLocation', 'No location, offline mode.');
        }

        const handleOnline = () => {
            setIsOnline(true);
            fetchLocation();
        };

        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [isOnline]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (title.trim() === '' || content.trim() === '') {
            setError('Title and content cannot be empty.');
            return;
        }

        await createNote(title, `${content}`, tags);
        playSound(newNoteSound);

        setTitle('');
        setContent('');
        setTags([]);
        setTagInput('');
        setError('');
        window.dispatchEvent(new Event('localStorageNoteAdded'));
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    return (
      <div className="p-4 rounded-lg shadow-md w-full box-border m-2">
          <h1 className="text-3xl mb-4">Add a New Note</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                      Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    ref={titleInputRef}
                    placeholder="Enter title"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline box-border ${
                      error && title.trim() === '' ? 'border-red-500' : ''
                    }`}
                  />
              </div>
              <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tags"
                  >
                      Tags
                  </label>
                  <div className="flex items-center">
                      <input
                        type="text"
                        id="tags"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Enter tags"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline box-border"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="bg-blue-500 text-white font-bold m-1 py-2 px-4 rounded size-1/4"
                      >
                          Add Tag
                      </button>
                  </div>
                  <div className="mt-2">
                      {tags.map((tag) => (
                        <span key={tag} className="tag">
                                {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-2 text-red-500"
                            >
                                    &times;
                                </button>
                            </span>
                      ))}
                  </div>
              </div>
              <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="content"
                  >
                      Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter content"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline box-border ${
                      error && content.trim() === ''
                        ? 'border-red-500'
                        : ''
                    }`}
                    rows={5}
                  />
              </div>
              <button
                type="submit"
                className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                style={{ backgroundColor: '#F92A82' }}
              >
                  Save Note
              </button>
          </form>
          {isOnline && (
            <button
              onClick={async () => {
                  try {
                      const response = await fetch(
                        'https://catfact.ninja/fact'
                      );
                      const data = await response.json();
                      const catFact = data.fact;
                      const userLocation =
                        localStorage.getItem('userLocation') ||
                        'No location provided';

                      await createNote(
                        'Cat Fact',
                        `${catFact}\n\nLocation: ${userLocation}`,
                        ['cat', 'fact']
                      );
                      playSound(newNoteSound);
                      window.dispatchEvent(
                        new Event('localStorageNoteAdded')
                      );
                  } catch (error) {
                      console.error('Error fetching cat fact:', error);
                      setError('Failed to fetch a cat fact.');
                  }
              }}
              className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
              style={{ backgroundColor: '#42A5F5' }}
            >
                Save a Random Cat Fact
            </button>
          )}
      </div>
    );
};

export default NewNoteForm;
