import React, { useState, useEffect } from 'react';
import { Play, Square, Circle, Upload, Share2, AlertCircle, HelpCircle, LogOut, ChevronDown, ChevronRight, Plus, Minus, Video, ExternalLink, CheckCircle, X, Clock, Zap, Users, TrendingUp, Settings, Eye, EyeOff } from 'lucide-react';

// Official Daydream Logo Component
const DaydreamLogo = ({ size = 40 }) => {
  const scale = size / 90; // Original SVG is 90x83
  return (
    <svg 
      width={size} 
      height={size * 0.922} // Maintain aspect ratio (83/90)
      viewBox="0 0 90 83" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path d="M66.5185 18.4265C53.8572 18.4265 43.5932 28.7282 43.5932 41.4364C43.5932 54.1446 53.8572 64.4463 66.5185 64.4463C79.1798 64.4463 89.4438 54.1446 89.4438 41.4364C89.4439 28.7282 79.1798 18.4266 66.5185 18.4265Z" fill="url(#paint0_linear_6389_1941)"/>
      <path d="M41.8719 0.381104C30.9833 0.381104 20.5407 4.70658 12.8413 12.406C5.14188 20.1054 0.816406 30.548 0.816406 41.4366C0.816407 52.3252 5.14188 62.7678 12.8413 70.4672C20.5407 78.1666 30.9833 82.4921 41.8719 82.4921V41.4366V0.381104Z" fill="url(#paint1_linear_6389_1941)"/>
      <defs>
        <linearGradient id="paint0_linear_6389_1941" x1="65.5285" y1="18.4266" x2="65.4583" y2="61.8352" gradientUnits="userSpaceOnUse">
          <stop offset="0.00113772" stopColor="#36619D"/>
          <stop offset="0.210396" stopColor="#2FBEC5"/>
          <stop offset="0.521083" stopColor="#FF982E"/>
          <stop offset="0.988296" stopColor="#F73B41"/>
        </linearGradient>
        <linearGradient id="paint1_linear_6389_1941" x1="43.6447" y1="0.381108" x2="43.7695" y2="77.8333" gradientUnits="userSpaceOnUse">
          <stop offset="0.00113772" stopColor="#36619D"/>
          <stop offset="0.210396" stopColor="#2FBEC5"/>
          <stop offset="0.521083" stopColor="#FF982E"/>
          <stop offset="0.988296" stopColor="#F73B41"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

// Tracking Event Logger Component
const EventLogger = ({ events }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 80,
      right: 20,
      width: 380,
      maxHeight: 500,
      backgroundColor: '#1a1a1a',
      border: '1px solid #333',
      borderRadius: 12,
      padding: 16,
      overflowY: 'auto',
      fontFamily: 'monospace',
      fontSize: 11,
      zIndex: 1000,
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
    }}>
      <div style={{ 
        color: '#e5e5e5', 
        marginBottom: 12, 
        fontWeight: 'bold',
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        📊 TRACKING EVENTS
        <span style={{ 
          marginLeft: 'auto', 
          fontSize: 10, 
          color: '#666',
          backgroundColor: '#0a0a0a',
          padding: '2px 8px',
          borderRadius: 4
        }}>
          {events.length} events
        </span>
      </div>
      {events.slice().reverse().map((event, i) => (
        <div key={i} style={{
          color: event.type === 'success' ? '#4ade80' : 
                 event.type === 'stream' ? '#60a5fa' : 
                 event.type === 'warning' ? '#fb923c' :
                 event.type === 'engagement' ? '#a78bfa' :
                 '#fbbf24',
          marginBottom: 6,
          padding: 8,
          backgroundColor: '#0a0a0a',
          borderRadius: 6,
          fontSize: 10,
          borderLeft: `3px solid ${
            event.type === 'success' ? '#4ade80' : 
            event.type === 'stream' ? '#60a5fa' : 
            event.type === 'warning' ? '#fb923c' :
            event.type === 'engagement' ? '#a78bfa' :
            '#fbbf24'
          }`
        }}>
          <div style={{ marginBottom: 2 }}>
            <span style={{ color: '#666' }}>[{event.timestamp}]</span>
          </div>
          <div>{event.message}</div>
          {event.metadata && (
            <div style={{ marginTop: 4, color: '#666', fontSize: 9 }}>
              {event.metadata}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Classification Badge Component
const ClassificationBadge = ({ classification }) => {
  const config = {
    'Highly Successful': { color: '#22c55e', emoji: '🎯', bg: '#15803d20' },
    'Moderately Successful': { color: '#3b82f6', emoji: '📊', bg: '#1e40af20' },
    'Unsuccessful': { color: '#ef4444', emoji: '📉', bg: '#991b1b20' }
  };
  
  const { color, emoji, bg } = config[classification] || config['Unsuccessful'];
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      borderRadius: 8,
      backgroundColor: bg,
      border: `1px solid ${color}40`,
      fontSize: 11,
      fontWeight: 600,
      color
    }}>
      {emoji} {classification}
    </div>
  );
};

const DaydreamPluginMockup = () => {
  // State Management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState('initial'); // initial, browser-opened, authenticating, success
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState('stream');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEventLogger, setShowEventLogger] = useState(false);
  const [streamDuration, setStreamDuration] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [events, setEvents] = useState([]);
  const [recordedClips, setRecordedClips] = useState([]);
  const [selectedClip, setSelectedClip] = useState(null);
  const [sessionEngagement, setSessionEngagement] = useState({
    paramChanges: 0,
    promptChanges: 0,
    totalStreamTime: 0,
    streamSessions: 0,
    recordingsMade: 0,
    sharesCompleted: 0
  });
  const [disconnectReason, setDisconnectReason] = useState(null);
  const [userClassification, setUserClassification] = useState('Unsuccessful');

  // Plugin Settings State
  const [settings, setSettings] = useState({
    model: 'stabilityai/sdxl-turbo',
    width: 1024,
    height: 576,
    prompt: 'a beautiful landscape with mountains and rivers',
    promptWeight: 1,
    seed: 241633,
    seedWeight: 1,
    steps: 1,
    guidanceScale: 1,
    ipAdapterEnabled: false,
    ipAdapterWeight: 0,
    ipAdapterImage: '',
    controlNetActive: false,
    controlNetModels: []
  });

  const [expandedSections, setExpandedSections] = useState({
    prompts: true,
    seed: false,
    advanced: false,
    controlNet: false,
    ipAdapter: false
  });

  // Brand Colors - Exact from Daydream Official Docs
  const colors = {
    background: '#0c0c0c',
    surface: '#141414',
    surfaceHover: '#1a1a1a',
    border: '#2a2a2a',
    borderHover: '#363636',
    primary: '#e8734a', // Daydream coral/orange accent
    primaryHover: '#d4623d',
    secondary: '#4ecdc4', // Daydream teal accent
    secondaryHover: '#45b7aa',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    textMuted: '#808080',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444'
  };

  // Tracking Helper
  const logEvent = (message, type = 'event', metadata = null) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents(prev => [...prev, { timestamp, message, type, metadata }]);
  };

  // Component Mount Tracking
  useEffect(() => {
    logEvent('🚀 Plugin loaded', 'event', 'referrer: direct | location: Redmond, WA');
    logEvent('📄 .toe file: daydream_project_v1.toe', 'event');
  }, []);

  // Classification Logic
  useEffect(() => {
    let classification = 'Unsuccessful';
    
    if (sessionEngagement.sharesCompleted > 0) {
      classification = 'Highly Successful';
    } else if (sessionEngagement.totalStreamTime >= 300 && sessionEngagement.paramChanges > 0) {
      classification = 'Moderately Successful';
    } else if (sessionEngagement.totalStreamTime < 300 && sessionEngagement.streamSessions > 0) {
      classification = 'Unsuccessful';
    }
    
    if (classification !== userClassification) {
      setUserClassification(classification);
      logEvent(`Classification updated: ${classification}`, 'engagement');
    }
  }, [sessionEngagement]);

  // Stream Duration Timer
  useEffect(() => {
    let interval;
    if (isStreaming) {
      interval = setInterval(() => {
        setStreamDuration(prev => {
          const newDuration = prev + 1;
          setSessionEngagement(s => ({ ...s, totalStreamTime: newDuration }));
          return newDuration;
        });
      }, 1000);
    } else {
      setStreamDuration(0);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Recording Duration Timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Auth Flow - Realistic Daydream OAuth
  const handleSignIn = () => {
    setShowAuthModal(true);
    setAuthStep('initial');
    logEvent('🔐 Sign in initiated', 'event');
  };

  const openBrowserAuth = () => {
    setAuthStep('browser-opened');
    logEvent('🌐 Browser window opened for OAuth', 'event');
    
    // Simulate browser authentication process
    setTimeout(() => {
      setAuthStep('authenticating');
      logEvent('⏳ Authenticating with daydream...', 'event');
    }, 2000);
    
    setTimeout(() => {
      setAuthStep('success');
      logEvent('✅ Authentication successful', 'success');
      logEvent('🔑 API key generated and stored locally', 'success');
    }, 4000);
  };

  const completeAuth = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    setAuthStep('initial');
    logEvent('✓ Login completed', 'success', 'user: demo@daydream.live');
    logEvent('🎨 Ready to stream!', 'success');
  };

  // Stream Controls
  const toggleStream = () => {
    if (!isStreaming) {
      setIsStreaming(true);
      setSessionEngagement(s => ({ ...s, streamSessions: s.streamSessions + 1 }));
      logEvent('▶️ Stream started', 'stream', `session #${sessionEngagement.streamSessions + 1}`);
    } else {
      setIsStreaming(false);
      const duration = formatTime(streamDuration);
      logEvent(`⏹️ Stream stopped`, 'stream', `duration: ${duration}`);
      
      // Simulate potential disconnect reasons
      if (Math.random() > 0.8) {
        const reasons = [
          'Network timeout',
          'GPU resource exhausted',
          'WHIP connection lost',
          'User initiated'
        ];
        const reason = reasons[Math.floor(Math.random() * reasons.length)];
        setDisconnectReason(reason);
        logEvent(`⚠️ Disconnect reason: ${reason}`, 'warning');
      }
    }
  };

  // Recording Controls
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingDuration(0);
      logEvent('🎬 Recording started', 'stream');
    } else {
      setIsRecording(false);
      const newClip = {
        id: Date.now(),
        duration: recordingDuration,
        timestamp: new Date().toLocaleTimeString(),
        thumbnail: '🎨',
        prompt: settings.prompt.substring(0, 50)
      };
      setRecordedClips(prev => [...prev, newClip]);
      setSessionEngagement(s => ({ ...s, recordingsMade: s.recordingsMade + 1 }));
      logEvent(`✓ Recording stopped`, 'success', `duration: ${formatTime(recordingDuration)}`);
      setRecordingDuration(0);
    }
  };

  // Share Flow
  const handleShare = (clip) => {
    setSelectedClip(clip);
    setShowShareModal(true);
    logEvent('📤 Share initiated', 'event', `clip: ${clip.id}`);
  };

  const completeShare = (includeWorkflow) => {
    setShowShareModal(false);
    setSessionEngagement(s => ({ ...s, sharesCompleted: s.sharesCompleted + 1 }));
    logEvent(`✓ Share completed`, 'success', `workflow included: ${includeWorkflow ? 'yes' : 'no'}`);
    logEvent('🚀 Clip published to profile + discover feed', 'success');
    logEvent('🔗 Live at: daydream.live/u/demo/clips/' + selectedClip.id, 'success');
  };

  // Parameter Changes (with tracking)
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSessionEngagement(s => ({ ...s, paramChanges: s.paramChanges + 1 }));
    logEvent(`⚙️ Parameter changed: ${key}`, 'engagement', `new value: ${value}`);
  };

  const updatePrompt = (value) => {
    setSettings(prev => ({ ...prev, prompt: value }));
    setSessionEngagement(s => ({ 
      ...s, 
      promptChanges: s.promptChanges + 1,
      paramChanges: s.paramChanges + 1 
    }));
    logEvent('✍️ Prompt updated', 'engagement', `length: ${value.length} chars`);
  };

  // Tab Navigation
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    logEvent(`📑 Tab navigated: ${tab}`, 'event');
  };

  // Toggle Section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Report Issue
  const handleReportIssue = () => {
    setShowReportModal(true);
    logEvent('🐛 Report issue opened', 'event');
  };

  const submitReport = (description) => {
    logEvent('✓ Issue reported', 'success', 'ticket created and assigned');
    alert('✅ Thank you! Your report has been submitted.\n\nTicket #' + Math.floor(Math.random() * 10000) + '\n\nYou\'ll receive updates via email at demo@daydream.live');
  };

  // Format Time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 1400,
      margin: '0 auto',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: '100vh',
      padding: 20
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${colors.border}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Official Daydream Logo */}
          <DaydreamLogo size={40} />
          <div>
            <div style={{ 
              fontSize: 16, 
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}>
              DAYDREAM
            </div>
            <div style={{ 
              fontSize: 10, 
              color: colors.textSecondary,
              fontWeight: 500,
              letterSpacing: '0.01em'
            }}>
              TouchDesigner Plugin • v1.0.0
            </div>
          </div>
        </div>

        {!isAuthenticated ? (
          <button onClick={handleSignIn} style={{
            backgroundColor: colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
          onMouseEnter={e => e.target.style.backgroundColor = colors.primaryHover}
          onMouseLeave={e => e.target.style.backgroundColor = colors.primary}>
            Sign in with daydream →
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ClassificationBadge classification={userClassification} />
            <div style={{
              backgroundColor: colors.surface,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: '8px 14px',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: colors.success
              }} />
              demo@daydream.live
            </div>
            <button style={{
              backgroundColor: 'transparent',
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              padding: '8px 12px',
              color: colors.textSecondary,
              cursor: 'pointer',
              fontSize: 12
            }}>
              <LogOut size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      {!isAuthenticated ? (
        <div style={{
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 80,
          textAlign: 'center',
          border: `1px solid ${colors.border}`
        }}>
          <div style={{
            margin: '0 auto 24px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <DaydreamLogo size={80} />
          </div>
          <h2 style={{ 
            fontSize: 32, 
            marginBottom: 16, 
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}>
            Welcome to DAYDREAM
          </h2>
          <p style={{ 
            color: colors.textSecondary, 
            fontSize: 16, 
            marginBottom: 40, 
            maxWidth: 600, 
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Stream real-time AI generation directly from TouchDesigner.<br/>
            Sign in to get started in under 60 seconds.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20,
            maxWidth: 800,
            margin: '0 auto 40px',
            textAlign: 'left'
          }}>
            <div style={{
              padding: 20,
              backgroundColor: colors.background,
              borderRadius: 10,
              border: `1px solid ${colors.border}`
            }}>
              <Zap size={24} color="#14b8a6" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Sub-second Latency</h3>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>
                Real-time streaming with TensorRT acceleration
              </p>
            </div>
            <div style={{
              padding: 20,
              backgroundColor: colors.background,
              borderRadius: 10,
              border: `1px solid ${colors.border}`
            }}>
              <Settings size={24} color="#14b8a6" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Full Control</h3>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>
                ControlNet, IP Adapter, and multi-model support
              </p>
            </div>
            <div style={{
              padding: 20,
              backgroundColor: colors.background,
              borderRadius: 10,
              border: `1px solid ${colors.border}`
            }}>
              <Share2 size={24} color="#14b8a6" style={{ marginBottom: 12 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Share & Discover</h3>
              <p style={{ fontSize: 12, color: colors.textSecondary, margin: 0 }}>
                Publish clips and workflows to the community
              </p>
            </div>
          </div>

          <button onClick={handleSignIn} style={{
            backgroundColor: colors.primary,
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '16px 40px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
            Sign in with daydream →
          </button>
        </div>
      ) : (
        <>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: 8,
            marginBottom: 20,
            borderBottom: `1px solid ${colors.border}`,
            paddingBottom: 0
          }}>
            {['stream', 'record', 'library', 'analytics', 'about'].map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  backgroundColor: activeTab === tab ? colors.surface : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab ? `2px solid ${colors.primary}` : '2px solid transparent',
                  color: activeTab === tab ? colors.text : colors.textSecondary,
                  padding: '12px 20px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stream Tab */}
          {activeTab === 'stream' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20 }}>
              {/* Preview Area */}
              <div style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000',
                  position: 'relative'
                }}>
                  {isStreaming ? (
                    <>
                      <div style={{
                        fontSize: 120,
                        opacity: 0.3,
                        animation: 'pulse 2s infinite'
                      }}>🎨</div>
                      <div style={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        backgroundColor: colors.danger,
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}>
                        <Circle size={10} fill="white" />
                        LIVE {formatTime(streamDuration)}
                      </div>
                      {isRecording && (
                        <div style={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          backgroundColor: colors.danger,
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}>
                          <Video size={16} />
                          REC {formatTime(recordingDuration)}
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        bottom: 16,
                        left: 16,
                        right: 16,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        backdropFilter: 'blur(10px)',
                        padding: 12,
                        borderRadius: 8,
                        fontSize: 12,
                        color: colors.textSecondary
                      }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, color: colors.text }}>
                          Current Prompt
                        </div>
                        {settings.prompt}
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                      <Play size={80} color={colors.textSecondary} style={{ marginBottom: 20 }} />
                      <div style={{ color: colors.text, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                        Ready to Stream
                      </div>
                      <div style={{ color: colors.textSecondary, fontSize: 14 }}>
                        Click "Start Stream" to begin generating
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Stream Controls */}
                <div style={{
                  padding: 20,
                  backgroundColor: colors.surface,
                  borderTop: `1px solid ${colors.border}`,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center'
                }}>
                  <button
                    onClick={toggleStream}
                    style={{
                      backgroundColor: isStreaming ? colors.danger : colors.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      padding: '14px 28px',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      flex: 1,
                      transition: 'all 0.2s'
                    }}
                  >
                    {isStreaming ? (
                      <>
                        <Square size={18} />
                        Stop Stream
                      </>
                    ) : (
                      <>
                        <Play size={18} />
                        Start Stream
                      </>
                    )}
                  </button>

                  <button
                    onClick={toggleRecording}
                    disabled={!isStreaming}
                    style={{
                      backgroundColor: isRecording ? colors.danger : colors.surface,
                      border: `2px solid ${isRecording ? colors.danger : colors.border}`,
                      color: isRecording ? 'white' : colors.text,
                      borderRadius: 8,
                      padding: '14px 28px',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: isStreaming ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      opacity: isStreaming ? 1 : 0.4,
                      transition: 'all 0.2s'
                    }}
                  >
                    <Circle size={16} fill={isRecording ? 'white' : 'transparent'} />
                    {isRecording ? 'Stop Rec' : 'Record'}
                  </button>
                </div>
              </div>

              {/* Settings Panel */}
              <div style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                padding: 24,
                height: 'fit-content',
                maxHeight: 720,
                overflowY: 'auto'
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20 }}>
                  Stream Settings
                </h3>

                {/* Model Selection */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 13, 
                    fontWeight: 600,
                    color: colors.text, 
                    marginBottom: 8 
                  }}>
                    Model
                  </label>
                  <select
                    value={settings.model}
                    onChange={(e) => updateSetting('model', e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 8,
                      padding: '10px 12px',
                      color: colors.text,
                      fontSize: 13,
                      cursor: 'pointer'
                    }}
                  >
                    <option>stabilityai/sdxl-turbo</option>
                    <option>runwayml/stable-diffusion-v1-5</option>
                    <option>SG161222/Realistic_Vision_V5.1</option>
                  </select>
                </div>

                {/* Resolution */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: 13, 
                    fontWeight: 600,
                    color: colors.text, 
                    marginBottom: 8 
                  }}>
                    Resolution (16:9)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 4 }}>Width</div>
                      <input
                        type="number"
                        value={settings.width}
                        onChange={(e) => updateSetting('width', parseInt(e.target.value))}
                        style={{
                          width: '100%',
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 8,
                          padding: '10px 12px',
                          color: colors.text,
                          fontSize: 13
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: colors.textSecondary, marginBottom: 4 }}>Height</div>
                      <input
                        type="number"
                        value={settings.height}
                        onChange={(e) => updateSetting('height', parseInt(e.target.value))}
                        style={{
                          width: '100%',
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                          borderRadius: 8,
                          padding: '10px 12px',
                          color: colors.text,
                          fontSize: 13
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${colors.border}`, margin: '24px 0' }} />

                {/* Prompts Section */}
                <div style={{ marginBottom: 20 }}>
                  <button
                    onClick={() => toggleSection('prompts')}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.text,
                      fontSize: 14,
                      fontWeight: 600,
                      padding: '10px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>Prompts</span>
                    {expandedSections.prompts ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedSections.prompts && (
                    <div style={{ paddingTop: 16 }}>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ 
                          display: 'block', 
                          fontSize: 12, 
                          color: colors.textSecondary, 
                          marginBottom: 6 
                        }}>
                          Prompt
                        </label>
                        <textarea
                          value={settings.prompt}
                          onChange={(e) => updatePrompt(e.target.value)}
                          placeholder="Describe what you want to generate..."
                          style={{
                            width: '100%',
                            backgroundColor: colors.background,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 8,
                            padding: '10px 12px',
                            color: colors.text,
                            fontSize: 13,
                            minHeight: 80,
                            resize: 'vertical',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 12, 
                          color: colors.textSecondary, 
                          marginBottom: 6 
                        }}>
                          <span>Prompt Weight</span>
                          <span style={{ color: colors.text, fontWeight: 600 }}>
                            {settings.promptWeight.toFixed(1)}
                          </span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={settings.promptWeight}
                          onChange={(e) => updateSetting('promptWeight', parseFloat(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Seed Section */}
                <div style={{ marginBottom: 20 }}>
                  <button
                    onClick={() => toggleSection('seed')}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.text,
                      fontSize: 14,
                      fontWeight: 600,
                      padding: '10px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>Seed</span>
                    {expandedSections.seed ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedSections.seed && (
                    <div style={{ paddingTop: 16 }}>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ 
                          display: 'block', 
                          fontSize: 12, 
                          color: colors.textSecondary, 
                          marginBottom: 6 
                        }}>
                          Seed Value
                        </label>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <input
                            type="number"
                            value={settings.seed}
                            onChange={(e) => updateSetting('seed', parseInt(e.target.value))}
                            style={{
                              flex: 1,
                              backgroundColor: colors.background,
                              border: `1px solid ${colors.border}`,
                              borderRadius: 8,
                              padding: '10px 12px',
                              color: colors.text,
                              fontSize: 13
                            }}
                          />
                          <button
                            onClick={() => updateSetting('seed', Math.floor(Math.random() * 1000000))}
                            style={{
                              backgroundColor: colors.surface,
                              border: `1px solid ${colors.border}`,
                              borderRadius: 8,
                              padding: '10px 14px',
                              color: colors.text,
                              cursor: 'pointer',
                              fontSize: 12
                            }}
                          >
                            Random
                          </button>
                        </div>
                      </div>
                      <div>
                        <label style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 12, 
                          color: colors.textSecondary, 
                          marginBottom: 6 
                        }}>
                          <span>Weight</span>
                          <span style={{ color: colors.text, fontWeight: 600 }}>
                            {settings.seedWeight.toFixed(1)}
                          </span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={settings.seedWeight}
                          onChange={(e) => updateSetting('seedWeight', parseFloat(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Advanced Section */}
                <div style={{ marginBottom: 20 }}>
                  <button
                    onClick={() => toggleSection('advanced')}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.text,
                      fontSize: 14,
                      fontWeight: 600,
                      padding: '10px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>Advanced</span>
                    {expandedSections.advanced ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedSections.advanced && (
                    <div style={{ paddingTop: 16 }}>
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 12, 
                          color: colors.textSecondary, 
                          marginBottom: 6 
                        }}>
                          <span>Steps</span>
                          <span style={{ color: colors.text, fontWeight: 600 }}>
                            {settings.steps}
                          </span>
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="4"
                          step="1"
                          value={settings.steps}
                          onChange={(e) => updateSetting('steps', parseInt(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ 
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 12, 
                          color: colors.textSecondary, 
                          marginBottom: 6 
                        }}>
                          <span>Guidance Scale</span>
                          <span style={{ color: colors.text, fontWeight: 600 }}>
                            {settings.guidanceScale.toFixed(1)}
                          </span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={settings.guidanceScale}
                          onChange={(e) => updateSetting('guidanceScale', parseFloat(e.target.value))}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* IP Adapter Section */}
                <div style={{ marginBottom: 20 }}>
                  <button
                    onClick={() => toggleSection('ipAdapter')}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.text,
                      fontSize: 14,
                      fontWeight: 600,
                      padding: '10px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>IP Adapter</span>
                    {expandedSections.ipAdapter ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedSections.ipAdapter && (
                    <div style={{ paddingTop: 16 }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 16,
                        cursor: 'pointer',
                        padding: '10px',
                        backgroundColor: colors.background,
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`
                      }}>
                        <input
                          type="checkbox"
                          checked={settings.ipAdapterEnabled}
                          onChange={(e) => updateSetting('ipAdapterEnabled', e.target.checked)}
                          style={{ width: 16, height: 16 }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>Enable IP Adapter</span>
                      </label>
                      
                      {settings.ipAdapterEnabled && (
                        <>
                          <div style={{ marginBottom: 16 }}>
                            <label style={{ 
                              display: 'block', 
                              fontSize: 12, 
                              color: colors.textSecondary, 
                              marginBottom: 6 
                            }}>
                              IP Image [TOP]
                            </label>
                            <input
                              type="text"
                              placeholder="Connect TOP operator..."
                              value={settings.ipAdapterImage}
                              onChange={(e) => updateSetting('ipAdapterImage', e.target.value)}
                              style={{
                                width: '100%',
                                backgroundColor: colors.background,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 8,
                                padding: '10px 12px',
                                color: colors.text,
                                fontSize: 13
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ 
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: 12, 
                              color: colors.textSecondary, 
                              marginBottom: 6 
                            }}>
                              <span>Weight</span>
                              <span style={{ color: colors.text, fontWeight: 600 }}>
                                {settings.ipAdapterWeight.toFixed(2)}
                              </span>
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={settings.ipAdapterWeight}
                              onChange={(e) => updateSetting('ipAdapterWeight', parseFloat(e.target.value))}
                              style={{ width: '100%' }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* ControlNet Section */}
                <div style={{ marginBottom: 20 }}>
                  <button
                    onClick={() => toggleSection('controlNet')}
                    style={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.text,
                      fontSize: 14,
                      fontWeight: 600,
                      padding: '10px 0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>ControlNet</span>
                    {expandedSections.controlNet ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                  
                  {expandedSections.controlNet && (
                    <div style={{ paddingTop: 16 }}>
                      <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 16,
                        cursor: 'pointer',
                        padding: '10px',
                        backgroundColor: colors.background,
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`
                      }}>
                        <input
                          type="checkbox"
                          checked={settings.controlNetActive}
                          onChange={(e) => updateSetting('controlNetActive', e.target.checked)}
                          style={{ width: 16, height: 16 }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 500 }}>Enable ControlNet</span>
                      </label>
                      
                      {settings.controlNetActive && (
                        <div style={{
                          padding: 16,
                          backgroundColor: colors.background,
                          borderRadius: 8,
                          fontSize: 12,
                          color: colors.textSecondary
                        }}>
                          <p style={{ margin: '0 0 12px 0' }}>
                            Configure ControlNet models (depth, canny, tile, etc.)
                          </p>
                          <button style={{
                            backgroundColor: colors.surface,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 6,
                            padding: '8px 14px',
                            color: colors.text,
                            fontSize: 12,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                          onClick={() => logEvent('➕ Add ControlNet model clicked', 'event')}>
                            <Plus size={14} />
                            Add Model
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Record Tab */}
          {activeTab === 'record' && (
            <div style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              padding: 40
            }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Your Recordings</h2>
                <p style={{ color: colors.textSecondary, fontSize: 14 }}>
                  Capture your live streams and share them with the community
                </p>
              </div>

              {recordedClips.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '80px 40px',
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  border: `1px dashed ${colors.border}`
                }}>
                  <Video size={80} color={colors.textSecondary} style={{ marginBottom: 20 }} />
                  <div style={{ color: colors.text, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                    No recordings yet
                  </div>
                  <div style={{ color: colors.textSecondary, fontSize: 14 }}>
                    Start streaming and hit the record button to capture your creations
                  </div>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                  gap: 20 
                }}>
                  {recordedClips.map(clip => (
                    <div key={clip.id} style={{
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 12,
                      overflow: 'hidden',
                      transition: 'all 0.2s'
                    }}>
                      <div style={{
                        aspectRatio: '16/9',
                        backgroundColor: '#000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 60,
                        position: 'relative'
                      }}>
                        {clip.thumbnail}
                        <div style={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          color: 'white',
                          fontWeight: 600
                        }}>
                          {formatTime(clip.duration)}
                        </div>
                      </div>
                      <div style={{ padding: 16 }}>
                        <div style={{ 
                          fontSize: 12, 
                          color: colors.textSecondary, 
                          marginBottom: 4,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}>
                          <Clock size={12} />
                          {clip.timestamp}
                        </div>
                        <div style={{
                          fontSize: 13,
                          color: colors.text,
                          marginBottom: 12,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {clip.prompt}
                        </div>
                        <button
                          onClick={() => handleShare(clip)}
                          style={{
                            width: '100%',
                            backgroundColor: colors.primary,
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            padding: '10px 16px',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            transition: 'all 0.2s'
                          }}
                        >
                          <Share2 size={16} />
                          Share to daydream
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Library Tab */}
          {activeTab === 'library' && (
            <div style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              padding: 60,
              textAlign: 'center'
            }}>
              <Users size={80} color="#14b8a6" style={{ marginBottom: 24 }} />
              <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
                Your daydream Library
              </h2>
              <p style={{ 
                color: colors.textSecondary, 
                fontSize: 14, 
                marginBottom: 32,
                maxWidth: 500,
                margin: '0 auto 32px'
              }}>
                Browse, manage, and share your published creations with the community
              </p>
              <button 
                onClick={() => logEvent('🔗 Profile opened', 'event', 'destination: daydream.live/u/demo')}
                style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: 10,
                  padding: '14px 32px',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                <ExternalLink size={18} />
                Open Profile on daydream
              </button>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              padding: 40
            }}>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Session Analytics</h2>
                <p style={{ color: colors.textSecondary, fontSize: 14 }}>
                  Track your usage and engagement metrics
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
                <div style={{
                  backgroundColor: colors.background,
                  padding: 24,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`
                }}>
                  <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 8 }}>
                    Total Stream Time
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 600, color: colors.primary }}>
                    {formatTime(sessionEngagement.totalStreamTime)}
                  </div>
                </div>
                <div style={{
                  backgroundColor: colors.background,
                  padding: 24,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`
                }}>
                  <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 8 }}>
                    Parameter Changes
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 600, color: colors.secondary }}>
                    {sessionEngagement.paramChanges}
                  </div>
                </div>
                <div style={{
                  backgroundColor: colors.background,
                  padding: 24,
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`
                }}>
                  <div style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 8 }}>
                    Shares Completed
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 600, color: colors.success }}>
                    {sessionEngagement.sharesCompleted}
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: colors.background,
                padding: 32,
                borderRadius: 12,
                border: `1px solid ${colors.border}`
              }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
                  Engagement Breakdown
                </h3>
                
                <div style={{ display: 'grid', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, color: colors.textSecondary }}>Stream Sessions</span>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{sessionEngagement.streamSessions}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, color: colors.textSecondary }}>Prompt Changes</span>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{sessionEngagement.promptChanges}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, color: colors.textSecondary }}>Recordings Made</span>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{sessionEngagement.recordingsMade}</span>
                  </div>
                  
                  <div style={{ 
                    borderTop: `1px solid ${colors.border}`, 
                    paddingTop: 16,
                    marginTop: 8
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                      User Classification
                    </div>
                    <ClassificationBadge classification={userClassification} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              border: `1px solid ${colors.border}`,
              padding: 40
            }}>
              <h2 style={{ 
                fontSize: 24, 
                fontWeight: 600, 
                marginBottom: 32,
                letterSpacing: '-0.02em'
              }}>
                About daydream
              </h2>
              
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Version</h3>
                <p style={{ color: colors.textSecondary, fontSize: 14 }}>
                  v1.0.0 • Released December 2024
                </p>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Documentation</h3>
                <a 
                  href="https://docs.daydream.live" 
                  onClick={() => logEvent('📚 Documentation opened', 'event')}
                  style={{
                    color: colors.primary,
                    fontSize: 14,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                  View Documentation <ExternalLink size={14} />
                </a>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Support</h3>
                <button
                  onClick={handleReportIssue}
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    padding: '12px 20px',
                    fontSize: 14,
                    color: colors.text,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontWeight: 500
                  }}
                >
                  <AlertCircle size={18} />
                  Report an Issue
                </button>
              </div>

              <div style={{
                padding: 24,
                backgroundColor: colors.background,
                borderRadius: 12,
                fontSize: 13,
                color: colors.textSecondary,
                lineHeight: 1.6
              }}>
                <p style={{ margin: 0 }}>
                  daydream brings real-time AI generation to TouchDesigner with sub-second latency,
                  ControlNet support, and seamless community integration.
                </p>
                <p style={{ marginTop: 16, marginBottom: 0 }}>
                  Made with ❤️ by the daydream team
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Realistic Auth Modal - Daydream OAuth Flow */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            border: `1px solid ${colors.border}`,
            maxWidth: 480,
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: 32,
              textAlign: 'center',
              borderBottom: `1px solid ${colors.border}`
            }}>
              <div style={{
                margin: '0 auto 20px',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <DaydreamLogo size={80} />
              </div>
              <h2 style={{ 
                fontSize: 24, 
                fontWeight: 600, 
                marginBottom: 8,
                letterSpacing: '-0.02em'
              }}>
                Sign in to DAYDREAM
              </h2>
              <p style={{ color: colors.textSecondary, fontSize: 14, margin: 0 }}>
                Secure authentication via OAuth 2.0
              </p>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 32 }}>
              {authStep === 'initial' && (
                <>
                  <p style={{ 
                    color: colors.textSecondary, 
                    fontSize: 14, 
                    marginBottom: 24,
                    lineHeight: 1.6
                  }}>
                    A browser window will open for secure authentication. 
                    Your API key will be generated automatically and stored locally.
                  </p>
                  <button
                    onClick={openBrowserAuth}
                    style={{
                      backgroundColor: colors.primary,
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '14px 24px',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: '100%',
                      marginBottom: 12,
                      transition: 'all 0.2s'
                    }}
                  >
                    Open Browser & Authenticate
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthModal(false);
                      logEvent('❌ Sign in cancelled', 'event');
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: colors.textSecondary,
                      padding: '10px',
                      fontSize: 14,
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}

              {authStep === 'browser-opened' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    border: `3px solid ${colors.primary}`,
                    borderTopColor: 'transparent',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                    Browser window opened
                  </div>
                  <div style={{ fontSize: 13, color: colors.textSecondary }}>
                    Please complete authentication in your browser...
                  </div>
                </div>
              )}

              {authStep === 'authenticating' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    border: `3px solid ${colors.secondary}`,
                    borderTopColor: 'transparent',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                    Authenticating...
                  </div>
                  <div style={{ fontSize: 13, color: colors.textSecondary }}>
                    Verifying your credentials with daydream
                  </div>
                </div>
              )}

              {authStep === 'success' && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{
                    width: 60,
                    height: 60,
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    backgroundColor: `${colors.success}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle size={36} color={colors.success} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                    Authentication Successful!
                  </div>
                  <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 24 }}>
                    API key generated and stored securely
                  </div>
                  <button
                    onClick={completeAuth}
                    style={{
                      backgroundColor: colors.success,
                      color: 'white',
                      border: 'none',
                      borderRadius: 10,
                      padding: '14px 24px',
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: 'pointer',
                      width: '100%'
                    }}
                  >
                    Continue to daydream
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedClip && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            border: `1px solid ${colors.border}`,
            padding: 40,
            maxWidth: 540,
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
              Share to daydream
            </h2>
            <p style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 28 }}>
              Your clip will be published to your profile and the discover feed.
            </p>
            
            {/* Clip Preview */}
            <div style={{
              backgroundColor: colors.background,
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
              border: `1px solid ${colors.border}`
            }}>
              <div style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 8 }}>
                Preview
              </div>
              <div style={{ 
                fontSize: 14, 
                color: colors.text,
                marginBottom: 4,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {selectedClip.prompt}
              </div>
              <div style={{ fontSize: 12, color: colors.textSecondary }}>
                Duration: {formatTime(selectedClip.duration)}
              </div>
            </div>

            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
              padding: 18,
              backgroundColor: colors.background,
              borderRadius: 12,
              marginBottom: 28,
              cursor: 'pointer',
              border: `1px solid ${colors.border}`
            }}>
              <input 
                type="checkbox" 
                defaultChecked 
                style={{ marginTop: 2, width: 18, height: 18 }} 
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                  Include .toe workflow file
                </div>
                <div style={{ fontSize: 12, color: colors.textSecondary }}>
                  Let others remix and build upon your creation (recommended)
                </div>
              </div>
            </label>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => completeShare(true)}
                style={{
                  flex: 1,
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: 10,
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Publish to Community
              </button>
              <button
                onClick={() => {
                  setShowShareModal(false);
                  logEvent('❌ Share cancelled', 'event');
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  borderRadius: 10,
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {showReportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: colors.surface,
            borderRadius: 16,
            border: `1px solid ${colors.border}`,
            padding: 40,
            maxWidth: 540,
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
              Report an Issue
            </h2>
            <p style={{ color: colors.textSecondary, fontSize: 14, marginBottom: 24 }}>
              Context about your session will be automatically included with your report.
            </p>
            
            <div style={{
              backgroundColor: colors.background,
              borderRadius: 10,
              padding: 14,
              marginBottom: 20,
              fontSize: 12,
              color: colors.textSecondary,
              fontFamily: 'monospace'
            }}>
              <div style={{ marginBottom: 4 }}>
                <strong style={{ color: colors.text }}>Auto-included context:</strong>
              </div>
              <div>• Plugin version: v1.0.0</div>
              <div>• Stream sessions: {sessionEngagement.streamSessions}</div>
              <div>• Total stream time: {formatTime(sessionEngagement.totalStreamTime)}</div>
              {disconnectReason && <div>• Last disconnect: {disconnectReason}</div>}
            </div>
            
            <textarea
              placeholder="Describe what happened and what you expected..."
              style={{
                width: '100%',
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                padding: 14,
                color: colors.text,
                fontSize: 14,
                minHeight: 120,
                marginBottom: 24,
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  submitReport();
                }}
                style={{
                  flex: 1,
                  backgroundColor: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: 10,
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Submit Report
              </button>
              <button
                onClick={() => {
                  setShowReportModal(false);
                  logEvent('❌ Report cancelled', 'event');
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  borderRadius: 10,
                  padding: '14px 24px',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event Logger */}
      {showEventLogger && <EventLogger events={events} />}

      {/* Event Logger Toggle Button */}
      <button
        onClick={() => setShowEventLogger(!showEventLogger)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: colors.primary,
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
          zIndex: 999,
          transition: 'all 0.2s'
        }}
        title={showEventLogger ? 'Hide tracking events' : 'Show tracking events'}
      >
        {showEventLogger ? <EyeOff size={24} /> : <Eye size={24} />}
      </button>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// For module systems (import/export)
export default DaydreamPluginMockup;

// For browser environment (GitHub Pages with Babel standalone)
if (typeof window !== 'undefined' && window.ReactDOM) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<DaydreamPluginMockup />);
}