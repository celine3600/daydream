# 🎨 Daydream TouchDesigner Plugin Requirement

## Overview

Daydream for TouchDesigner is the official plugin for creating real-time AI-generated visuals directly within TouchDesigner. Stream, record, and share your AI-powered creations with seamless integration to the Daydream platform.

**60 seconds from download to streaming.** No API keys to copy. No external setup required.

## Requirements

| Requirement | Version |
|-------------|---------|
| TouchDesigner | **2025+** (required, no legacy support) |
| Operating System | macOS or Windows |
| GPU | NVIDIA recommended for local inference |
| Daydream Account | Free tier available |

## Pre-request
1. Download the TouchDesigner latest version - https://derivative.ca/download
2. Have a Derivative account- https://derivative.ca/user/register

## Installation
1. **Download** the latest `.tox` file from Releases
2. **Open** the project file in TouchDesigner 2025+ 
3. **Done** — no additional dependencies required

## Quick Start User journey

```
Download → Open in TD → Sign In Daydream→ Start Streaming→ Tweak parameters-> Record → Share
```

### Step-by-Step

1. **Sign In** — Click "Sign in with Daydream" in the plugin panel. A browser window opens for authentication. Your API key is generated and stored automatically.

2. **Connect Input** — Wire/drag any files to the plugin's input. Webcam, video, generative visuals — anything works.

3. **Start Streaming** — Click "Start Stream" and watch your input transform in real-time.

4. **Iterate/Tweak Parameters** — Adjust prompts, controlnets, and other parameters to dial in your look in real time.

5. **Record & Share** — Capture clips directly in the plugin and publish to your Daydream profile.

## Features

### Core Capabilities

- **Real-time Streaming** — Sub-second latency AI image generation
- **Multiple Models** — StreamDiffusion v2, SDXL Turbo, LCM-LoRA
- **IP Adapter** — Style transfer from reference images with Face ID support (SDXL model)
- **Multi-ControlNet** — Canny, Depth, Pose, and Scribble modes and more
- **In-App Recording** — Capture output clips without leaving TouchDesigner
- **One-Click Sharing** — Publish to your Daydream profile with optional .toe workflow

### What's New vs StreamDiffusionTD

| Feature | StreamDiffusionTD | Daydream |
|---------|-------------------|----------|
| Authentication | Copy/paste API key | OAuth (automatic) |
| New AI Features | Weeks long | Day-one support |
| Recording | External tools | Built-in |
| Sharing | Manual | Integrated |
| Support | Manually in discord | In-app tickets |

## Documentation (Link to the About tab)

- **[Knowledge Hub](https://docs.daydream.live/knowledge-hub/tutorials/stream-diffusion-td)** — Tutorials, guides, and examples

## Support

### In-App Support (Link to the About tab)

Use the **Report Issue** button in the About tab, it links to the bug report we are having. This automatically captures:
- TouchDesigner version
- Operating system
- GPU information
- Recent error logs
-. Screenshots or screen recordings if applicable


### Community

- **[Discord](https://discord.gg/daydream)** — Chat with the community


