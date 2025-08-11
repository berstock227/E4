# Troubleshooting Guide

## 🚨 Common Issues & Solutions

### 1. Server Connection Issues (ECONNREFUSED)

**Problem**: Frontend cannot connect to backend server
```
Error: connect ECONNREFUSED 127.0.0.1:8000
```

**Solutions**:
1. **Check if server is running**:
   ```bash
   netstat -ano | findstr :8000
   ```

2. **Start the server**:
   ```bash
   npm run server
   # or
   node mock-server.js
   ```

3. **Start both frontend and backend**:
   ```bash
   npm run dev:full
   # or
   npm start
   ```

### 2. 500 Internal Server Error

**Problem**: API endpoints return 500 errors

**Solutions**:
1. **Check server logs** for specific error messages
2. **Restart the server**:
   ```bash
   # Stop all Node processes
   taskkill /f /im node.exe
   
   # Start server again
   npm run server
   ```

3. **Check route conflicts** - Ensure specific routes come before parameterized routes

### 3. CORS Issues

**Problem**: Cross-origin requests blocked

**Solutions**:
1. **Check CORS configuration** in `mock-server.js`
2. **Verify proxy settings** in `vite.config.js`
3. **Restart both frontend and backend**

### 4. Port Already in Use

**Problem**: Port 8000 or 3000 already occupied

**Solutions**:
1. **Find process using the port**:
   ```bash
   netstat -ano | findstr :8000
   ```

2. **Kill the process**:
   ```bash
   taskkill /f /PID <process_id>
   ```

3. **Or change ports** in configuration files

### 5. Module Not Found Errors

**Problem**: Cannot find modules or packages

**Solutions**:
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### 6. API Endpoints Not Working

**Problem**: Specific endpoints return errors

**Solutions**:
1. **Check endpoint order** in `mock-server.js`
2. **Verify route patterns** - specific routes must come before parameterized routes
3. **Test endpoints directly**:
   ```bash
   curl http://localhost:8000/api/health
   ```

## 🔧 Quick Fix Commands

### Reset Everything
```bash
# Stop all processes
taskkill /f /im node.exe

# Clear cache
npm cache clean --force

# Reinstall dependencies
npm install

# Start fresh
npm run dev:full
```

### Check System Status
```bash
# Check if ports are in use
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# Check Node processes
tasklist | findstr node
```

### Test API Manually
```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Test stats endpoint
curl http://localhost:8000/api/stats

# Test blogs endpoint
curl http://localhost:8000/api/blogs
```

## 📋 Pre-flight Checklist

Before starting development:

- [ ] Node.js version >= 18.0.0
- [ ] All dependencies installed (`npm install`)
- [ ] No other processes using ports 3000/8000
- [ ] Server starts without errors
- [ ] Frontend can connect to backend
- [ ] API endpoints respond correctly

## 🆘 Emergency Procedures

### If Nothing Works

1. **Complete Reset**:
   ```bash
   # Stop everything
   taskkill /f /im node.exe
   
   # Clear everything
   rm -rf node_modules package-lock.json
   
   # Fresh install
   npm install
   
   # Start fresh
   npm run dev:full
   ```

2. **Check System Resources**:
   - Available memory
   - Disk space
   - CPU usage

3. **Restart Development Environment**:
   - Close all terminals/command prompts
   - Restart VS Code/editor
   - Open fresh terminal

## 📞 Getting Help

If issues persist:

1. **Check the logs** - Look for specific error messages
2. **Verify configuration** - Ensure all files are properly configured
3. **Test step by step** - Start server first, then frontend
4. **Check documentation** - Review README.md and other docs

## 🔍 Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
set DEBUG=*
npm run server
```

This will show detailed logs for troubleshooting.
