function useAuth() {
  const context = useContext();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
